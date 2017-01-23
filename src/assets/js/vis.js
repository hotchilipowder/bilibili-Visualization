var config = {
    'debug': true,
};

var debug = config.debug ? console.log.bind(console) : function () {};

var vis = {

    main: function () {

        // 将颜色的数值化为十六进制字符串表示
        var RRGGBB = function (color) {
            var t = Number(color).toString(16).toUpperCase();
            if (t.length > 6) {
                t = t.substring(0, 6);
            }
            return Array(7 - t.length).join('0') + t;
        };

        var getCid = function (callback) {
            debug('get cid...');
            var cid = null,
                src = null;
            try {
                src = document.querySelector('#bofqi iframe').src.replace(/^.*\?/, '');
                console.log('src:' + src);
                cid = Number(src.match(/cid=(\d+)/)[1]);
            } catch (e) {}
            if (!cid) try {
                src = document.querySelector('#bofqi embed').getAttribute('flashvars');
                cid = Number(src.match(/cid=(\d+)/)[1]);
            } catch (e) {}
            if (!cid) try {
                src = document.querySelector('#bofqi object param[name="flashvars"]').getAttribute('value');
                cid = Number(src.match(/cid=(\d+)/)[1]);
            } catch (e) {}
            debug(cid + 'find here');
            if (cid) setTimeout(callback, 0, cid);
            else {
                $.ajax({
                    url: "",
                    async: false,
                    success: function (data) {
                        try {
                            cid = Number(data.match(/cid=(\d+)/)[1]);
                        } catch (e) {}
                        setTimeout(callback, 0, cid || undefined);
                    },
                });
            }
        };

        //获取时间长度
        var length_transform = function (video_length) {
            var result = video_length.match(/\d{2,3}/g);
            debug(result);
            return result.reduce(function (prev, cur, item, array) {
                return parseInt(prev) * 60 + parseInt(cur);
            });
        };

        //
        var uptime_transform = function (datetime) {
            var result = datetime.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})(\d{2})/g);

        };
        var parseXML = function (content) {
            // debug(typeof(content));
            // var data = (new DOMParser()).parseFromString(content, 'application/xml');
            var video_length = $(".bilibili-player-video-time-total").text();
            video_length = length_transform(video_length);
            data = content;
            debug(video_length);
            return Array.apply(Array, data.querySelectorAll('d')).map(function (line) {
                var info = line.getAttribute('p').split(','),
                    text = line.textContent;
                return {
                    'text': text,
                    'video_len': video_length,
                    'time': Number(info[0]),
                    'mode': [undefined, 'R2L', 'R2L', 'R2L', 'BOTTOM', 'TOP'][Number(info[1])],
                    'size': Number(info[2]),
                    'color': RRGGBB(Number(info[3])),
                    'bottom': Number(info[5]) > 0,
                    'create': Number(info[4]),
                    'pool': Number(info[5]),
                    'sender': String(info[6]),
                    'dmid': Number(info[7]),
                };
            });
        };

        var vis_danmu = function (data) {
            debug(data);
            $.ajax({
                url: "http://comment.bilibili.com/" + data + '.xml',
                async: false,
                success: function (data) {
                    debug(data);
                    try{
                        var danmu = parseXML(data);
                    }catch(e){
                        debug(e);
                    }
                    debug("done");
                    debug(danmu);
                    visualize(danmu);
                },
                error: function (xhr, textStatus, errorThrown) {
                    console.log(textStatus);
                    if (textStatus == 'timeout') {
                        this.tryCount++;
                        if (this.tryCount <= this.retryLimit) {
                            //try again
                            $.ajax(this);
                            return;
                        }
                        return;
                    };
                    
                    if (xhr.status == 500) {
                        //handle error
                    } else {
                        this.tryCount++;
                        if (this.tryCount <= this.retryLimit) {
                            //try again
                            $.ajax(this);
                            return;
                        }
                        return;
                    }
                }
            })
        };



        var visualize = function (csv_data) {


            function print_filter(filter) {
                var f = eval(filter);
                if (typeof (f.length) != "undefined") {} else {}
                if (typeof (f.top) != "undefined") {
                    f = f.top(Infinity);
                } else {}
                if (typeof (f.dimension) != "undefined") {
                    f = f.dimension(function (d) {
                        return "";
                    }).top(Infinity);
                } else {}
                debug(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
            };

            var danmu_lineChart = dc.lineChart('#danmu-line-chart');
            var danmu_barChart = dc.barChart('#danmu-volume-chart');

            var danmu_Table = dc.dataTable('.dc-data-table');
            var danmu_Count = dc.dataCount('.dc-data-count');

            var colorChart = dc.pieChart('#color-chart');
            var posChart = dc.pieChart('#pos-chart');
            var charNumChart = dc.pieChart('#char-chart');


            var danmu_up_barChart = dc.barChart('#danmu-up-chart');

            var data = [];

            /* 修改开始出*/

            //弹幕时间 分割
            var time_cut = 100;
            //图表宽度
            var row_width = $(".modal-dialog").width() * 10 / 12;
            //上传时间的分割
            var up_time_cut = 100;
            //字数分割
            var char_num_cut = 5;

            var video_length = parseFloat(csv_data[1].video_len);
            var video_up_time = new Date($("time").attr("datetime"));
            video_up_time = video_up_time.valueOf() / 1000;


            var max_smt = 0;
            var min_smt = new Date();
            min_smt = min_smt.valueOf();

            var min_char_num = 2000;
            var max_char_num = 0;

            for (var i = 0; i < csv_data.length; i++) {
                csv_data[i].time = +csv_data[i].time;
                csv_data[i].create = +csv_data[i].create;
                if (csv_data[i].create < min_smt) {
                    min_smt = csv_data[i].create;
                };
                if (csv_data[i].create > max_smt) {
                    max_smt = csv_data[i].create;
                };
                var content_len = csv_data[i].text.length;
                if (content_len < min_char_num) {
                    min_char_num = content_len;
                };
                if (content_len > max_char_num) {
                    max_char_num = content_len;
                }
                data.push({
                    showTime: csv_data[i].time,
                    videoRatio: csv_data[i].time / video_length,
                    column: parseInt(csv_data[i].time / video_length * time_cut) / time_cut,
                    content: csv_data[i].text,
                    contentLen: csv_data[i].text.length,
                    fontSize: csv_data[i].size,
                    color: csv_data[i].color,
                    submitTime: csv_data[i].create,
                    danmuType: csv_data[i].mode
                })
            };

            if(video_up_time){
                min_smt =video_up_time;
            };


            debug(min_smt);
            debug(max_smt);
            /* 修改开始出*/

            var ndx = crossfilter(data);
            // print_filter(ndx)
            var all = ndx.groupAll();

            var cls = ndx.dimension(function (d) {
                return d.column;
            });

            var ratioGroup = cls.group().reduceSum(function (d) {
                return 1;
            });

            var color = ndx.dimension(function (d) {
                return d.color;
            })

            var colorGroup = color.group().reduceSum(function (d) {
                return 1;
            });

            var pos = ndx.dimension(function (d) {
                return d.danmuType;
            });

            var posGroup = pos.group().reduceSum(function (d) {
                return 1;
            });

            var st = ndx.dimension(function (d) {
                var radio = (d.submitTime - min_smt) / (max_smt - min_smt);
                return parseInt(radio * up_time_cut) / up_time_cut;
            });

            var stGroup = st.group().reduceSum(function (d) {
                return 1;
            });

            var char_num = ndx.dimension(function (d) {
                var radio = (d.contentLen - min_char_num) / (max_char_num - min_char_num);
                return parseInt(radio * char_num_cut) / char_num_cut;
            });

            var cnGroup = char_num.group().reduceSum(function (d) {
                return 1;
            });

            String.prototype.toHHMMSS = function () {
                var sec_num = parseInt(this, 10); // don't forget the second param
                var hours = Math.floor(sec_num / 3600);
                var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
                var seconds = sec_num - (hours * 3600) - (minutes * 60);
                if (hours < 10) {
                    hours = "0" + hours;
                }
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                return hours + ':' + minutes + ':' + seconds;
            };


            //test
            // print_filter(st.group());

            colorChart /*  */
                .width(200)
                .height(200)
                .radius(80)
                .innerRadius(30)
                .dimension(color)
                .group(colorGroup)
                .label(function (d) {
                    return "#" + d.key;
                });
            // debug("colorChart done!");
            colorChart.colors(function (d, i) {
                return "#" + d;
            });

            posChart
                .width(200)
                .height(200)
                .radius(80)
                .innerRadius(30)
                .dimension(pos)
                .group(posGroup)
                .colors(d3.scale.category10());

            charNumChart
                .width(200)
                .height(200)
                .radius(80)
                .innerRadius(30)
                .dimension(char_num)
                .group(cnGroup)
                .label(function (d) {
                    var begin = parseInt(d.key * max_char_num);
                    var end = parseInt((d.key + 1.0 / char_num_cut) * max_char_num);
                    return begin + '~' + end + '字';
                })
                .colors(d3.scale.ordinal().range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"]));
            
            
            charNumChart
                .title(function (d) {
                    var begin = parseInt(d.key * max_char_num);
                    var end = parseInt((d.key + 1.0 / char_num_cut) * max_char_num);
                    return begin + '~' + end + '字' + ':' + d.value;
                });

            danmu_lineChart
                .width(row_width)
                .height(200)
                .margins({
                    top: 20,
                    right: 50,
                    bottom: 20,
                    left: 40
                })
                .renderArea(true)
                .transitionDuration(1000)
                .dimension(cls)
                .group(ratioGroup)
                // .mouseZoomable(true)
                .renderHorizontalGridLines(true)
                .rangeChart(danmu_barChart)
                .x(d3.scale.linear().domain([0, 1]))
                .interpolate('cardinal')
                .renderDataPoints(true)
                .clipPadding(10)
                .elasticY(true)
                .brushOn(false)
                .xAxis().tickFormat(function (v) {
                    var num = new Number(v);
                    var num = num * video_length;
                    return num.toFixed(2).toHHMMSS();
                });



            danmu_lineChart
                .colors(function (d, i) {
                    return "#e8799d";
                })
                .yAxisLabel("弹幕数量");



            danmu_lineChart
                .renderTitle(true)
                .title(function (d) {
                    var begin = new Number(d.key) * video_length;
                    var end = begin + 1.0 / time_cut * video_length;
                    var time = begin.toFixed(2).toHHMMSS() + '~' + end.toFixed(2).toHHMMSS();
                    return time + "的弹幕数为" + d.value;
                });


            danmu_barChart
                .height(40)
                .width(row_width)
                .margins({
                    top: 0,
                    right: 50,
                    bottom: 20,
                    left: 40
                })
                .dimension(cls)
                .group(ratioGroup)
                .centerBar(true)
                .gap(1)
                .x(d3.scale.linear().domain([0, 1]))
                .alwaysUseRounding(true)
                .xUnits(function () {
                    return time_cut;
                });
            
            
            danmu_barChart
                .colors(function (d, i) {
                    return "#e8799d";
                });


            // 
            // 

            danmu_up_barChart
                .width(row_width)
                .height(200)
                .margins({
                    top: 0,
                    right: 50,
                    bottom: 20,
                    left: 40
                })
                .dimension(st)
                .group(stGroup)
                .centerBar(true)
                .gap(2)
                .x(d3.scale.linear().domain([0, 1]))
                .alwaysUseRounding(true)
                .xUnits(function () {
                    return up_time_cut;
                })
                .xAxis().tickFormat(function (v) {
                    debug(v);
                    var num = new Number((v * (max_smt - min_smt) + min_smt) * 1000);
                    var m = new Date(num);
                    var dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
                    return dateString;
                });


            danmu_Table /* dc.dataTable('.dc-data-table', 'chartGroup') */
                .dimension(cls)
                // Data table does not use crossfilter group but rather a closure
                // as a grouping function
                .group(function (d) {
                    return "当前时间段：" + d.column + "前10条弹幕信息";
                })
                // (_optional_) max number of records to be shown, `default = 25`
                .size(10)
                // There are several ways to specify the columns; see the data-table documentation.
                // This code demonstrates generating the column header automatically based on the columns.
                .columns([
               // Use the `d.date` field; capitalized automatically
                    {
                        label: 'ShowTime',
                        format: function (d) {
                            var num = new Number(d.showTime);
                            return num.toFixed(2).toHHMMSS();
                        }
               },
               // Use `d.open`, `d.close`
                    {
                        label: 'Color',
                        format: function (d) {
                            var return_svg = '<svg width="20" height="20"><rect width="30" height="20" style="fill:#';
                            return_svg = return_svg + d.color + '"></rect></svg>'
                            return return_svg;
                        }
               },
               'fontSize', {
                        label: 'Content',
                        format: function (d) {
                            var return_str = '<p style="font-size:' + d.fontSize * 0.5 + 'px;'
                            return_str = return_str + '">'
                            return_str = return_str + d.content + '</p>'
                            return return_str;
                        }
               }, {
                        label: "UpTime",
                        format: function (d) {
                            var d2 = new Date();
                            var format = d3.time.format("%Y-%m-%d");
                            // console.log(parseInt(d.submitTime) + d2.getTimezoneOffset() * 60000);
                            var date = new Date(parseInt(d.submitTime) * 1000 + d2.getTimezoneOffset() * 60000)
                            return format(date);
                        }
               }
               // Use `d.volume`
           ])
                // (_optional_) sort using the given field, `default = function(d){return d;}`
                .sortBy(function (d) {
                    return d.showTime;
                })
                // (_optional_) sort order, `default = d3.ascending`
                .order(d3.ascending)
                // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
                .on('renderlet', function (table) {
                    table.selectAll('.dc-table-group').classed('info', true);
                });

            danmu_Count /* dc.dataCount('.dc-data-count', 'chartGroup'); */
                .dimension(ndx)
                .group(all)
                .html({
                    some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                        ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();$("#danmu-up-chart svg").attr("height", 250);\'>Reset All</a>',
                    all: '当前视频所有的弹幕都被选择，可以进行筛选'
                });


            function print_table(data) {
                var table = '<table class="table " id="myTable">' + "<thead><tr>" +
                    "    <th>出现时间</th>" +
                    "    <th>出现位置</th>" +
                    "    <th>颜色</th>" +
                    "    <th>字体大小</th>" +
                    "    <th>内容</th>" +
                    "    <th>弹幕提交时间</th>" +
                    "    <th>弹幕提交者</th>" +
                    "</tr></thead><tbody>"
                for (var i = 0; i < data.length; i++) {
                    table = table + "<tr>";
                    var num = new Number(data[i].time)
                    table = table + "<td>" + num.toFixed(2).toHHMMSS() + "</td>";
                    table = table + ("<td>" + data[i].mode + "</td>");
                    table = table + ("<td>" + data[i].color + "</td>");
                    table = table + ("<td>" + data[i].size + "</td>");
                    table = table + ("<td>" + data[i].text + "</td>");
                    create_time = new Date(Number(data[i].create)*1000);
                    create_date = create_time.getUTCFullYear()+"年"+(create_time.getUTCMonth()+1)+"月";
                    create_date = create_date + create_time.getUTCDate() + "日"+create_time.getUTCHours()+":";
                    create_date = create_date + create_time.getUTCMinutes();
                    table = table + ("<td>" + create_date + "</td>");
                    table = table + ("<td>" + data[i].sender + "</td>");
                    table = table + '</tr>';
                }
                table = table + "<tbody></table>";
                $('#full-data-table').append(table);
            };
            dc.renderAll();
            $("#danmu-up-chart svg").attr("height", 250);
            print_table(csv_data);
            $('#myTable').DataTable();
            debug("render done!");
        };

        getCid(vis_danmu);
    }

}

// window.onload=function(){
//   var rs = getCid(debug_console);
//   console.log(rs);
// }