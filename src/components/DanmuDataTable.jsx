import React, {Component} from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Popover, Icon} from 'antd';
import moment from 'moment';

import { bilibili_midcrc } from '../utils/BiliBili_crc2mid.js'
import { toHHMMSS } from '../utils/utils'

export default class DanmuDataTable extends Component{
    constructor(props){
        super(props)
        this.state={
            who: new bilibili_midcrc()
        }
    }


    computeWho = (cell, row)=>{
        const him = this.state.who(cell);
        const him_url = `https://space.bilibili.com/${him}`;
        if(him > 0){
            return <span>
                        <Icon type="arrow-right" /><a href={him_url} target="_black" title={cell}>{him}</a>
                    </span>
        }else{
            return <div>
                        <Icon type="info-circle-o" /><span>暂不得知谁</span>
                        <br/>
                        <span>已知的情报hash={cell}</span>
                   </div>
        }
    }


    submitTimeFormat= (cell, row) => {
        const submit_time = moment(cell*1000).format('YYYY-MM-DD HH:mm:ss');
        return <span>{submit_time}</span>;
    }

    showTimeFormat= (cell, row) => {
        return (<div>
                <span>{toHHMMSS(cell)}</span>
                </div>
                );
    }

    colorFormat= (cell, row) => {
        return (<div>
                <svg width="10" height="10">
                    <rect width="10" height="10" style={{fill: '#'+cell}}></rect>
                </svg>
                    <span>{cell}</span>
                </div>
        )
    }

    danmuTypeFormat= (cell, row) => {
        const dict = {
            'TOP': '顶部',
            'BOTTOM': '底部',
            undefined: '未知',
            'R2L': '从右至左'
        }
        return <span>{dict[cell]}</span>
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
                     <TableHeaderColumn dataField="index" isKey width="40px">编号 </TableHeaderColumn>
                     <TableHeaderColumn dataField="showTime" width="100px" dataFormat={this.showTimeFormat} dataSort>出现时间 </TableHeaderColumn>
                     <TableHeaderColumn dataField="danmuType" width="100px" dataFormat={this.danmuTypeFormat} dataSort>出现位置 </TableHeaderColumn>
                     <TableHeaderColumn dataField="color" width="80px" dataFormat={this.colorFormat} dataSort>颜色 </TableHeaderColumn>
                     <TableHeaderColumn dataField="fontSize" width="50px" >字体大小 </TableHeaderColumn>
                     <TableHeaderColumn dataField="content">内容 </TableHeaderColumn>
                     <TableHeaderColumn dataField="submitTime" width="100px" dataSort dataFormat={this.submitTimeFormat}>提交时间 </TableHeaderColumn>
                     <TableHeaderColumn dataField="sender" width="100px" dataFormat={this.computeWho}>提交者</TableHeaderColumn>
                </BootstrapTable>
        );
    }
}