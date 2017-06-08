import React, {Component} from "react";
import dc from 'dc'
import d3 from 'd3'
import $ from 'jquery'
import crossfilter from 'crossfilter'
import '../styles/dc.scss'
import '../styles/bootstrap-sass/bootstrap.scss'
import DanmuDataTable from './DanmuDataTable'
var config = {
    'debug': false,
};

var debug = config.debug ? console.log.bind(console) : function () {};

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

export default class DanmuDCVis extends Component{
    state = {
        all_data : [],
        selected_data :[]
    }
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("here!!!");
        
        var danmu_lineChart = dc.lineChart('#danmu-line-chart');
        var danmu_barChart = dc.barChart('#danmu-volume-chart');

        var danmu_Table = dc.dataTable('.dc-data-table');
        var danmu_Count = dc.dataCount('.dc-data-count');

        var colorChart = dc.pieChart('#color-chart');
        var posChart = dc.pieChart('#pos-chart');
        var charNumChart = dc.pieChart('#char-chart');

        var danmu_up_barChart = dc.barChart('#danmu-up-chart');

        let {csv_data,video_up_time, video_len} = this.props;

        var data = [];
        var time_cut = 100;
        //图标宽度
        var row_width = $("div.bootstrap-custom").width() * 10 /12;
        console.log(row_width, 55);
        row_width = row_width> 0 ? row_width: 400; 
        var up_time_cut = 100;
        //字数分割
        var char_num_cut = 5;
        var video_length = parseFloat(csv_data[1].video_len);
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
                danmuType: csv_data[i].mode,
                sender: csv_data[i].sender
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
                right: 0,
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
                right: 0,
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


        danmu_up_barChart
            .width(row_width)
            .height(300)
            .margins({
                top: 20,
                right: 0,
                bottom: 50,
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
        danmu_up_barChart
            .yAxisLabel("弹幕数量")

        const datas = cls.top(Infinity);
        danmu_Table /* dc.dataTable('.dc-data-table', 'chartGroup') */
            .dimension(cls)
            // Data table does not use crossfilter group but rather a closure
            // as a grouping function
            .group(function(d){
                return '';
            })
            .size(Infinity)
            .on('preRedraw', (chart)=>{
                this.setState({
                    selected_data:cls.top(Infinity)
                });
                console.log(this)
            });
        //     // (_optional_) max number of records to be shown, `default = 25`
        //     
        //     // There are several ways to specify the columns; see the data-table documentation.
        //     // This code demonstrates generating the column header automatically based on the columns.
        //     .columns([
        //     // Use the `d.date` field; capitalized automatically
        //         {
        //             label: 'ShowTime',
        //             format: function (d) {
        //                 datas.push(d)
        //                 var num = new Number(d.showTime);
        //                 return num.toFixed(2).toHHMMSS();
        //             }
        //     },
        //     // Use `d.open`, `d.close`
        //         {
        //             label: 'Color',
        //             format: function (d) {
        //                 var return_svg = '<svg width="20" height="20"><rect width="30" height="20" style="fill:#';
        //                 return_svg = return_svg + d.color + '"></rect></svg>'
        //                 return return_svg;
        //             }
        //     },
        //     'fontSize', {
        //             label: 'Content',
        //             format: function (d) {
        //                 var return_str = '<p style="font-size:' + d.fontSize * 0.5 + 'px;'
        //                 return_str = return_str + '">'
        //                 return_str = return_str + d.content + '</p>'
        //                 return return_str;
        //             }
        //     }, {
        //             label: "UpTime",
        //             format: function (d) {
        //                 var d2 = new Date();
        //                 var format = d3.time.format("%Y-%m-%d");
        //                 var date = new Date(parseInt(d.submitTime) * 1000 + d2.getTimezoneOffset() * 60000)
        //                 return format(date);
        //             }
        //     }
        //     // Use `d.volume`
        // ])


        danmu_Count /* dc.dataCount('.dc-data-count', 'chartGroup'); */
            .dimension(ndx)
            .group(all)
            .html({
                some: '<strong>%total-count</strong>条弹幕中的<strong>%filter-count</strong>条弹幕被选中',
                all: '当前视频所有的弹幕(共%total-count条)被选择，可以进行筛选'
            });
        this.setState({
            all_data: datas,
            selected_data: datas
        })
        dc.renderAll();
        console.log("render done!")
    }
    handleReset(){
        dc.filterAll(); 
        dc.renderAll();
        const all_data = this.state.all_data;
        this.setState({
            selected_data: all_data
        })
    }

    render(){
        console.log(this.state)
        return (<div className="bootstrap-custom">
                    <div className="contain">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                 <h3>弹幕分布图</h3>
                                <div className="row">
                                    <div id="danmu-line-chart"></div>        
                                    <div id="danmu-volume-chart"></div>
                                </div>
                                <div className="chart-title text-center">弹幕出现时间</div>
                                
                            </div>
                            <div className="col-md-10 col-md-offset-1">
                                <h3>弹幕上传信息</h3>
                                <div className="row">
                                    <div id="danmu-up-chart"></div>
                                </div>
                                <div className="chart-title text-center">弹幕上传时间</div>
                            </div>
                            <div className="col-md-10 col-md-offset-1">
                                <h3>弹幕数据概况</h3>
                                <div className="row">
                                    <div id="color-chart" className="col-md-4 pie-chart">
                                        <strong className="pie-title">颜色分布情况</strong>
                                    </div>
                                    <div id="pos-chart" className="col-md-4 pie-chart">
                                        <strong className="pie-title">位置分布情况</strong>
                                    </div>
                                    <div id="char-chart" className="col-md-4 pie-chart">
                                        <strong className="pie-title">弹幕长度分布情况</strong>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10 col-md-offset-1">
                                
                                <h3 style={{marginTop:40}}>弹幕部分列表 </h3>
                                <div className="dc-data-count" style={{marginTop:20}}>
                                    <span className="filter-count"></span> 
                                </div>
                               
                            </div>
                            <div className="col-md-10 col-md-offset-1">
                                 <DanmuDataTable data={this.state.selected_data}/>
                            </div>
                        </div>
                    </div>
                </div>)
    }
}