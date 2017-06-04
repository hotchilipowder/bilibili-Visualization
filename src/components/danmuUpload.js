import React, {Component} from "react";
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react';
import $ from 'jquery';

export default class DanmuUpload extends Component{
    state = {
        option: {}
    }
    constructor(props){
        super(props)
        this.getOption = this.getOption.bind(this);
    }
    getOption(){
        let option ={}
        $.get('/data/obama_budget_proposal_2012.list.json', function (obama_budget_2012) {

            option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true
                        }
                    }
                },
                title: {
                    left: 'left',
                    text: '弹幕分布面积图',
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                legend: {
                    data:['Growth', 'Budget 2011', 'Budget 2012'],
                    itemGap: 5
                },
                
                xAxis: [
                    {
                        type : 'category',
                        data : obama_budget_2012.names
                    }
                ],
                yAxis: [
                    {
                        type : 'value',
                        name : 'Budget (million USD)',
                        axisLabel: {
                            formatter: function (a) {
                                a = +a;
                                return isFinite(a)
                                    ? echarts.format.addCommas(+a / 1000)
                                    : '';
                            }
                        }
                    }
                ],
                dataZoom: [
                    {
                        show: true,
                        start: 94,
                        end: 100
                    },
                    {
                        type: 'inside',
                        start: 94,
                        end: 100
                    },
                    {
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 30,
                        height: '80%',
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
                series : [
                    {
                        name: 'Budget 2011',
                        type: 'bar',
                        data: obama_budget_2012.budget2011List
                    },
                    {
                        name: 'Budget 2012',
                        type: 'bar',
                        data: obama_budget_2012.budget2012List
                    }
                ]
            };
            this.setState({
                option
            })
        }.bind(this));
    }

    componentDidMount(){
        this.getOption();
    }

    render(){

        let option = this.state.option;
        console.log(option);
        if(option.dataZoom){
            return  (<ReactEcharts
            option={option}
            style={{height: '300px', width: '100%'}}
            />)
        }else{
            return <h1></h1>
        }
       
    }
}