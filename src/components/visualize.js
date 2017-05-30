import dc from 'dc'
import d3 from 'd3'
import $ from 'jquery'
import crossfilter from 'crossfilter'

export function visualize (csv_data) {

    // let danmu_lineChart = dc.lineChart('#danmu-line-chart');
    // let danmu_barChart = dc.barChart('#danmu-volume-chart');

    let colorChart = dc.pieChart('#color-chart');
    // let posChart = dc.pieChart('#pos-chart');
    // let charNumChart = dc.pieChart('#char-chart');


    // let danmu_up_barChart = dc.barChart('#danmu-up-chart');

    let data = [];

            /* 修改开始出*/
    //图表宽度
    let row_width = 500;

    //弹幕时间 分割
    let time_cut = 100;
    //上传时间的分割
    let up_time_cut = 100;
    //字数分割
    let char_num_cut = 5;

    let video_length = parseFloat(csv_data[1].video_len);
    let video_up_time = new Date($("time").attr("datetime"));
    video_up_time = video_up_time.valueOf() / 1000;


    let max_smt = 0;
    let min_smt = new Date();
    min_smt = min_smt.valueOf();

    let min_char_num = 2000;
    let max_char_num = 0;

    for (let i = 0; i < csv_data.length; i++) {
        csv_data[i].time = +csv_data[i].time;
        csv_data[i].create = +csv_data[i].create;
        if (csv_data[i].create < min_smt) {
            min_smt = csv_data[i].create;
        };
        if (csv_data[i].create > max_smt) {
            max_smt = csv_data[i].create;
        };
        let content_len = csv_data[i].text.length;
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



    let ndx = crossfilter(data);
    // print_filter(ndx)
    let all = ndx.groupAll();

    let cls = ndx.dimension(function (d) {
        return d.column;
    });

    let ratioGroup = cls.group().reduceSum(function (d) {
        return 1;
    });

    let color = ndx.dimension(function (d) {
        return d.color;
    })

    let colorGroup = color.group().reduceSum(function (d) {
        return 1;
    });

    let pos = ndx.dimension(function (d) {
        return d.danmuType;
    });

    let posGroup = pos.group().reduceSum(function (d) {
        return 1;
    });

    let st = ndx.dimension(function (d) {
        let radio = (d.submitTime - min_smt) / (max_smt - min_smt);
        return parseInt(radio * up_time_cut) / up_time_cut;
    });

    let stGroup = st.group().reduceSum(function (d) {
        return 1;
    });

    let char_num = ndx.dimension(function (d) {
        let radio = (d.contentLen - min_char_num) / (max_char_num - min_char_num);
        return parseInt(radio * char_num_cut) / char_num_cut;
    });

    let cnGroup = char_num.group().reduceSum(function (d) {
        return 1;
    });


        

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
    // console.log("colorChart done!");
    colorChart.colors(function (d, i) {
        return "#" + d;
    });

    // posChart
    //     .width(200)
    //     .height(200)
    //     .radius(80)
    //     .innerRadius(30)
    //     .dimension(pos)
    //     .group(posGroup)
    //     .colors(d3.scale.category10());

    // charNumChart
    //     .width(200)
    //     .height(200)
    //     .radius(80)
    //     .innerRadius(30)
    //     .dimension(char_num)
    //     .group(cnGroup)
    //     .label(function (d) {
    //         let begin = parseInt(d.key * max_char_num);
    //         let end = parseInt((d.key + 1.0 / char_num_cut) * max_char_num);
    //         return begin + '~' + end + '字';
    //     })
    //     .colors(d3.scale.ordinal().range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"]));
    
    
    // charNumChart
    //     .title(function (d) {
    //         let begin = parseInt(d.key * max_char_num);
    //         let end = parseInt((d.key + 1.0 / char_num_cut) * max_char_num);
    //         return begin + '~' + end + '字' + ':' + d.value;
    //     });

    // danmu_lineChart
    //     .width(row_width)
    //     .height(200)
    //     .margins({
    //         top: 20,
    //         right: 50,
    //         bottom: 20,
    //         left: 40
    //     })
    //     .renderArea(true)
    //     .transitionDuration(1000)
    //     .dimension(cls)
    //     .group(ratioGroup)
    //     // .mouseZoomable(true)
    //     .renderHorizontalGridLines(true)
    //     .rangeChart(danmu_barChart)
    //     .x(d3.scale.linear().domain([0, 1]))
    //     .interpolate('cardinal')
    //     .renderDataPoints(true)
    //     .clipPadding(10)
    //     .elasticY(true)
    //     .brushOn(false)
    //     .xAxis().tickFormat(function (v) {
    //         let num = new Number(v);
    //         num = num * video_length;
    //         return num.toFixed(2).toHHMMSS();
    //     });



    // danmu_lineChart
    //     .colors(function (d, i) {
    //         return "#e8799d";
    //     })
    //     .yAxisLabel("弹幕数量");



    // danmu_lineChart
    //     .renderTitle(true)
    //     .title(function (d) {
    //         let begin = new Number(d.key) * video_length;
    //         let end = begin + 1.0 / time_cut * video_length;
    //         let time = begin.toFixed(2).toHHMMSS() + '~' + end.toFixed(2).toHHMMSS();
    //         return time + "的弹幕数为" + d.value;
    //     });


    // danmu_barChart
    //     .height(40)
    //     .width(row_width)
    //     .margins({
    //         top: 0,
    //         right: 50,
    //         bottom: 20,
    //         left: 40
    //     })
    //     .dimension(cls)
    //     .group(ratioGroup)
    //     .centerBar(true)
    //     .gap(1)
    //     .x(d3.scale.linear().domain([0, 1]))
    //     .alwaysUseRounding(true)
    //     .xUnits(function () {
    //         return time_cut;
    //     });
    
    
    // danmu_barChart
    //     .colors(function (d, i) {
    //         return "#e8799d";
    //     });


    // // 
    // // 

    // danmu_up_barChart
    //     .width(row_width)
    //     .height(200)
    //     .margins({
    //         top: 0,
    //         right: 50,
    //         bottom: 20,
    //         left: 40
    //     })
    //     .dimension(st)
    //     .group(stGroup)
    //     .centerBar(true)
    //     .gap(2)
    //     .x(d3.scale.linear().domain([0, 1]))
    //     .alwaysUseRounding(true)
    //     .xUnits(function () {
    //         return up_time_cut;
    //     })
    //     .xAxis().tickFormat(function (v) {
    //         console.log(v);
    //         let num = new Number((v * (max_smt - min_smt) + min_smt) * 1000);
    //         let m = new Date(num);
    //         let dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
    //         return dateString;
    //     });

        
    dc.renderAll();
    $("#danmu-up-chart svg").attr("height", 250);
};