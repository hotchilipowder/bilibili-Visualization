var config = {
    'debug': true,
};

var debug = config.debug ? console.log.bind(console) : function() {};


// 将颜色的数值化为十六进制字符串表示
var RRGGBB = function(color) {
    var t = Number(color).toString(16).toUpperCase();
    return t;
};

var getCid = function(callback) {
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
    debug(cid + '-------here');
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


var length_transform = function(video_length) {
    var result = video_length.match(/\d{2}/g);
    return result.reduce(function(prev, cur, item, array) {
        return parseInt(prev) * 60 + parseInt(cur);
    });
    // video_length.match(/(:?(\d{2})\:){1,2}(\d{2})/);
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


var debug_console = function(data) {
    debug(data);
    $.ajax({
        url: "http://comment.bilibili.com/" + data + '.xml',
        async: false,
        success: function(data) {
            var danmu = parseXML(data);

        }
    })
};


var visualize = function(data) {
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
    var time_cut = 50;
    var row_width = $(".row>div").width();
    var Barchart = dc.barChart('#danmu-bar');
    var LineChart = dc.lineChart('#monthly-move-chart');
    var nasdaqTable = dc.dataTable('.dc-data-table');
    var nasdaqCount = dc.dataCount('.dc-data-count');
    var quarterChart = dc.pieChart('#quarter-chart');
    var quarter2Chart = dc.pieChart('#quarter2-chart');

    for (var i = 0; i < data.length; i++) {
        data[i].time = +data[i].time
        data.push({
            show_time: data[i].time,
            video_ratio: data[i].time / video_len,
            cls: parseInt(data[i].show_time / video_len * time_cut) / time_cut,
            content: data[i].text,
            font_size: data[i].size,
            color: data[i].color,
            submit_time: data[i].create,
            danmu_type: data[i].mode
        })
    }
    var ndx = crossfilter(data);
    // print_filter(ndx)
    var all = ndx.groupAll();
    var cls = ndx.dimension(function(d) {
        return d.cls;
    });
    /* dc.lineChart('#monthly-move-chart', 'chartGroup') */
    var ratioGroup = cls.group().reduceSum(function(d) {
        return 1;
    });
    var quarter = ndx.dimension(function(d) {
        return d.color;
    })
    var quarterGroup = quarter.group().reduceSum(function(d) {
        return 1;
    });
    var quarter2 = ndx.dimension(function(d) {
        return d.danmu_type;
    })
    var quarterGroup2 = quarter2.group().reduceSum(function(d) {
        return 1;
    });
    print_filter(ratioGroup);

    quarterChart /* dc.pieChart('#quarter-chart', 'chartGroup') */
        .width(200)
        .height(200)
        .radius(80)
        .innerRadius(30)
        .dimension(quarter)
        .group(quarterGroup)
        .label(function(d) {
            var hex = function(x) {
                return parseInt(x).toString(16);
            }

            return "#" + hex(d.key);
        });

    quarter2Chart
        .width(200)
        .height(200)
        .radius(80)
        .dimension(quarter2)
        .group(quarterGroup2)
    Barchart
        .height(400)
        .width(row_width)
        .margins({
            top: 0,
            right: 50,
            bottom: 40,
            left: 40
        })
        .x(d3.scale.linear().domain([0, 1]))
        .brushOn(false)
        .rangeChart(LineChart)
        .yAxisLabel("弹幕数量")
        .xAxisLabel("弹幕出现视频比率")
        .xAxisPadding("10%")
        .dimension(cls)
        .group(ratioGroup)
        .gap(1)
        .xUnits(function() {
            return time_cut;
        });
    LineChart
        .width(row_width)
        .height(150)
        .margins({
            top: 0,
            right: 50,
            bottom: 20,
            left: 40
        })
        .mouseZoomable(true)
        .x(d3.scale.linear().domain([0, 1]))
        .interpolate('basis')
        .renderArea(true)
        .brushOn(true)
        .renderDataPoints(false)
        .clipPadding(10)
        .dimension(cls)
        .group(ratioGroup)
        .elasticY(false)
        .yAxis().tickFormat(function(v) {
            return ""
        });

    String.prototype.toHHMMSS = function() {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ':' + minutes + ':' + seconds;
    };
    nasdaqTable /* dc.dataTable('.dc-data-table', 'chartGroup') */
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
                    var num = new Number(d.show_time);
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
                    console.log(return_svg);
                    return return_svg;
                }
            },
            'font_size', {
                label: 'Content',
                format: function(d) {
                    var return_str = '<p style="font-size:' + d.font_size * 0.5 + 'px;'
                    return_str = return_str + '">'
                    return_str = return_str + d.content + '</p>'
                    return return_str;
                }
            }, {
                label: "UpTime",
                format: function(d) {
                    var d2 = new Date();
                    var format = d3.time.format("%Y-%m-%d");
                    console.log(parseInt(d.submit_time) + d2.getTimezoneOffset() * 60000);
                    var date = new Date(parseInt(d.submit_time) * 1000 + d2.getTimezoneOffset() * 60000)
                    return format(date);
                }
            }
            // Use `d.volume`
        ])
        // (_optional_) sort using the given field, `default = function(d){return d;}`
        .sortBy(function(d) {
            return d.show_time;
        })
        // (_optional_) sort order, `default = d3.ascending`
        .order(d3.ascending)
        // (_optional_) custom renderlet to post-process chart using [D3](http://d3js.org)
        .on('renderlet', function(table) {
            table.selectAll('.dc-table-group').classed('info', true);
        });
    nasdaqCount /* dc.dataCount('.dc-data-count', 'chartGroup'); */
        .dimension(ndx)
        .group(all)
        .html({
            some: '<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Reset All</a>',
            all: '当前视频所有的弹幕都被选择，可以进行筛选'
        });
    dc.renderAll();
};

getCid(debug_console);

// window.onload=function(){
//   var rs = getCid(debug_console);
//   console.log(rs);
// }
