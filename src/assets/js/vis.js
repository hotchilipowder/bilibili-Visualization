var config : {
    'debug': true,
};

var debug = config.debug ? console.log.bind(console) : function() {};



var vis = {
  
    // 将颜色的数值化为十六进制字符串表示
    RRGGBB : function(color) {
        var t = Number(color).toString(16).toUpperCase();
        if (t.length > 6) {
            t = t.substring(0, 6);
        }
        return Array(7 - t.length).join('0') + t;
    };


    getCid : function(callback) {
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
                success: function(data) {
                    try {
                        cid = Number(data.match(/cid=(\d+)/)[1]);
                    } catch (e) {}
                    setTimeout(callback, 0, cid || undefined);
                },
            });
        }
    };

    //获取时间长度
    var length_transform = function(video_length) {
        var result = video_length.match(/\d{2}/g);
        return result.reduce(function(prev, cur, item, array) {
            return parseInt(prev) * 60 + parseInt(cur);
        });
    };

    //
    var uptime_transform = function(datetime) {
        var result = datetime.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})(\d{2})/g);

    };
    var parseXML = function(content) {
        // debug(typeof(content));
        // var data = (new DOMParser()).parseFromString(content, 'application/xml');
        var video_length = $(".bilibili-player-video-time-total").text();
        video_length = length_transform(video_length);
        data = content;
        return Array.apply(Array, data.querySelectorAll('d')).map(function(line) {
            var info = line.getAttribute('p').split(','),
                text = line.textContent;
            debug(info);
            return {
                'text': text,
                'video_len': video_length,
                'time': Number(info[0]),
                'mode': [undefined, 'R2L', 'R2L', 'R2L', 'BOTTOM', 'TOP'][Number(info[1])],
                'size': Number(info[2]),
                'color': RRGGBB(Number(info[3])),
                'bottom': Number(info[5]) > 0,
                'create': new Date(Number(info[4])),
                'pool': Number(info[5]),
                'sender': String(info[6]),
                'dmid': Number(info[7]),
            };
        });
    };


    var vis_danmu = function(data) {
        debug(data);
        $.ajax({
            url: "http://comment.bilibili.com/" + data + '.xml',
            async: false,
            success: function(data) {
                var danmu = parseXML(data);
                visualize(danmu);

            }
        })
    };


    var visualize = function(csv_data) {

        function print_filter(filter) {
            var f = eval(filter);
            if (typeof(f.length) != "undefined") {} else {}
            if (typeof(f.top) != "undefined") {
                f = f.top(Infinity);
            } else {}
            if (typeof(f.dimension) != "undefined") {
                f = f.dimension(function(d) {
                    return "";
                }).top(Infinity);
            } else {}
            console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
        }


        //弹幕时间 分割
        var time_cut = 100;
        //图表宽度
        var row_width = $(".modal-dialog").width() * 10 / 12;
        //上传时间的分割
        var up_time_cut = 100;


        var danmu_lineChart = dc.lineChart('#danmu-line-chart');
        var danmu_barChart = dc.barChart('#danmu-volume-chart');

        var danmu_up_lineChart = dc.lineChart('#danmu-up-chart');

        var danmu_Table = dc.dataTable('.dc-data-table');
        var danmu_Count = dc.dataCount('.dc-data-count');
        var colorChart = dc.pieChart('#color-chart');
        var posChart = dc.pieChart('#pos-chart');

        var data = [];

        /* 修改开始出*/
        var video_length = parseFloat(csv_data[1].video_len);
        var video_up_time = 1439281200;
        var max_smt = 0;
        var min_smt = new Date();
        min_smt = min_smt.valueOf();

        for (var i = 0; i < csv_data.length; i++) {
            csv_data[i].time = +csv_data[i].time;
            csv_data[i].sender = +csv_data[i].sender;
            if (csv_data[i].sender < min_smt) {
                min_smt = csv_data[i].sender;
            };
            if (csv_data[i].sender > max_smt) {
                max_smt = csv_data[i].sender;
            };
            data.push({
                showTime: csv_data[i].time,
                videoRatio: csv_data[i].time / video_length,
                column: parseInt(csv_data[i].time / video_length * time_cut) / time_cut,
                content: csv_data[i].text,
                fontSize: csv_data[i].size,
                color: csv_data[i].color,
                submitTime: csv_data[i].sender,
                danmuType: csv_data[i].mode
            })
        };

        console.log(min_smt);
        console.log(max_smt);
        min_smt = video_up_time;
        /* 修改开始出*/


        var ndx = crossfilter(data);
        // print_filter(ndx)
        var all = ndx.groupAll();

        var cls = ndx.dimension(function(d) {
            return d.column;
        });

        var ratioGroup = cls.group().reduceSum(function(d) {
            return 1;
        });

        var color = ndx.dimension(function(d) {
            return d.color;
        })

        var colorGroup = color.group().reduceSum(function(d) {
            return 1;
        });

        var pos = ndx.dimension(function(d) {
            return d.danmuType;
        })

        var posGroup = pos.group().reduceSum(function(d) {
            return 1;
        });

        var st = ndx.dimension(function(d) {
            var radio = (d.submitTime - min_smt) / (max_smt - min_smt);
            return parseInt(radio * up_time_cut) / up_time_cut;
        });

        var stGroup = st.group().reduceSum(function(d) {
            return 1;
        });



        //test
        print_filter(st.group());

        colorChart /*  */
            .width(200)
            .height(200)
            .radius(80)
            .innerRadius(30)
            .dimension(color)
            .group(colorGroup)
            .label(function(d) {
                var hex = function(x) {
                    return parseInt(x).toString(16);
                }
                return "#" + hex(d.key);
            });

        posChart
            .width(200)
            .height(200)
            .radius(80)
            .innerRadius(30)
            .dimension(pos)
            .group(posGroup);

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
            .gap(2)
            .x(d3.scale.linear().domain([0, 1]))
            .alwaysUseRounding(true)
            .xUnits(function() {
                return time_cut;
            })
            .X;
        // .brushOn(false)
        // .rangeChart(danmu_lineChart)
        // .yAxisLabel("弹幕数量")
        // .xAxisLabel("弹幕出现视频比率")
        // .xAxisPadding("10%")

        danmu_lineChart
            .width(row_width)
            .height(200)
            .margins({
                top: 0,
                right: 50,
                bottom: 20,
                left: 40
            })
            .renderArea(true)
            .transitionDuration(1000)
            .dimension(cls)
            .group(ratioGroup)
            .mouseZoomable(true)
            .renderHorizontalGridLines(true)
            .rangeChart(danmu_barChart)
            .x(d3.scale.linear().domain([0, 1]))
            .interpolate('cardinal')
            .renderDataPoints(true)
            .clipPadding(10)
            .elasticY(true)
            .brushOn(false)
            .xAxis().tickFormat(function(v) {
                var num = new Number(v);
                var num = num * video_length;
                return num.toFixed(2).toHHMMSS();
            });

        danmu_lineChart
            .renderTitle(true)
            .title(function(d) {
                var begin = new Number(d.key) * video_length;
                var end = begin + 1.0 / time_cut * video_length;
                var time = begin.toFixed(2).toHHMMSS() + '~' + end.toFixed(2).toHHMMSS();
                return time + "的弹幕数为" + d.value;
            });

        danmu_up_lineChart
            .width(row_width)
            .height(200)
            .margins({
                top: 0,
                right: 50,
                bottom: 20,
                left: 40
            })
            .renderArea(true)
            .transitionDuration(1000)
            .dimension(st)
            .group(stGroup)
            .mouseZoomable(true)
            .renderHorizontalGridLines(true)
            .x(d3.scale.linear().domain([0, 1]))
            .renderDataPoints(true)
            .clipPadding(10)
            .elasticY(true)
            .brushOn(false);



        String.prototype.toHHMMSS = function() {
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

        danmu_Table /* dc.dataTable('.dc-data-table', 'chartGroup') */
            .dimension(cls)
            // Data table does not use crossfilter group but rather a closure
            // as a grouping function
            .group(function(d) {
                return "当前时间段：" + d.cls + "前50条弹幕信息";
            })
            // (_optional_) max number of records to be shown, `default = 25`
            .size(50)
            // There are several ways to specify the columns; see the data-table documentation.
            // This code demonstrates generating the column header automatically based on the columns.
            .columns([
                // Use the `d.date` field; capitalized automatically
                {
                    label: 'ShowTime',
                    format: function(d) {
                        var num = new Number(d.showTime);
                        return num.toFixed(2).toHHMMSS();
                    }
                },
                // Use `d.open`, `d.close`
                {
                    label: 'Color',
                    format: function(d) {
                        var hex = function(x) {
                            return parseInt(x).toString(16);
                        }
                        var return_svg = '<svg width="20" height="20"><rect width="30" height="20" style="fill:#';
                        return_svg = return_svg + hex(d.color) + '"></rect></svg>'
                        return return_svg;
                    }
                },
                'fontSize', {
                    label: 'Content',
                    format: function(d) {
                        var return_str = '<p style="font-size:' + d.fontSize * 0.5 + 'px;'
                        return_str = return_str + '">'
                        return_str = return_str + d.content + '</p>'
                        return return_str;
                    }
                }, {
                    label: "UpTime",
                    format: function(d) {
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
            .sortBy(function(d) {
                return d.showTime;
            })
            // (_optional_) sort order, `default = d3.ascending`
            .order(d3.ascending)
            // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
            .on('renderlet', function(table) {
                table.selectAll('.dc-table-group').classed('info', true);
            });

        danmu_Count /* dc.dataCount('.dc-data-count', 'chartGroup'); */
            .dimension(ndx)
            .group(all)
            .html({
                some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                    ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
                all: '当前视频所有的弹幕都被选择，可以进行筛选'
            });

        dc.renderAll();
    };


    main : function() {
        this.getCid(vis_danmu);
    }

}

// window.onload=function(){
//   var rs = getCid(debug_console);
//   console.log(rs);
// }
