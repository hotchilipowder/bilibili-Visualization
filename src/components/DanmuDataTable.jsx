import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Progress} from 'antd'
import moment from 'moment'
const columns = [
    {
        title: '出现时间',
        key: 'showTime',
        dataIndex: 'showTime',
    },{
        title: '出现位置',
        key: 'danmuType',
        dataIndex: 'danmuType'
    },{
        title: '颜色',
        key: 'color',
        dataIndex: 'color'
    },{
        title: '字体大小',
        key: 'fontSize',
        dataIndex: 'fontSize'
    },{
        title: '内容',
        key: 'content',
        dataIndex: 'content'
    },{
        title: '弹幕提交时间',
        key: 'submitTime',
        dataIndex: 'submitTime'
    },{
        title: '弹幕提交者',
        key: 'sender',
        dataIndex: 'sender'
    }
]


function toHHMMSS(number) {
    var sec_num = parseInt(number, 10); // don't forget the second param
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

function submitTimeFormat(cell,row){
    const submit_time = moment(cell*1000).format('YYYY-MM-DD HH:mm:ss');
    return <span>{submit_time}</span>;
}

function showTimeFormat(cell, row){
    return (<div>
            <span>{toHHMMSS(cell)}</span>
            </div>
            );
}
function colorFormat(cell, row){
    return (<div>
            <svg width="10" height="10">
                <rect width="10" height="10" style={{fill: '#'+cell}}></rect>
            </svg>
                <span>{cell}</span>
            </div>
    )
}
function danmuTypeFormat(cell, row){
    const dict = {
        'TOP': '顶部',
        'BOTTOM': '底部',
        undefined: '未知',
        'R2L': '从右至左'
    }
    return <span>{dict[cell]}</span>
}

export default class DanmuDataTable extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {data} = this.props;
        const table_data = []
        data.forEach((item, index, array)=>{
            item.index = index;
            const table_item = {
                index: index,
                showTime: item.showTime,
                danmuType: item.danmuType,
                color: item.color,
                fontSize: item.fontSize,
                content: item.content,
                submitTime: item.submitTime,
                sender: item.sender
            };
            table_data.push(table_item);
        })
        return (<BootstrapTable data={data} pagination search exportCSV>
                     <TableHeaderColumn dataField="index" isKey width="50px">编号 </TableHeaderColumn>
                     <TableHeaderColumn dataField="showTime" width="100px" dataFormat={showTimeFormat} dataSort>出现时间 </TableHeaderColumn>
                     <TableHeaderColumn dataField="danmuType" width="100px" dataFormat={danmuTypeFormat} dataSort>出现位置 </TableHeaderColumn>
                     <TableHeaderColumn dataField="color" width="80px" dataFormat={colorFormat} dataSort>颜色 </TableHeaderColumn>
                     <TableHeaderColumn dataField="fontSize" width="50px" >字体大小 </TableHeaderColumn>
                     <TableHeaderColumn dataField="content">内容 </TableHeaderColumn>
                     <TableHeaderColumn dataField="submitTime" width="100px" dataSort dataFormat={submitTimeFormat}>提交时间 </TableHeaderColumn>
                     <TableHeaderColumn dataField="sender" width="80px">提交者</TableHeaderColumn>
                </BootstrapTable>
        );
    }
}