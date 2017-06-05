import React, {Component} from "react";
import { Table } from 'antd'

const columns = [
    {
        title: '出现时间',
        key: 'time',
        dataIndex: 'time'
    },{
        title: '出现位置',
        key: 'mode',
        dataIndex: 'mode'
    },{
        title: '颜色',
        key: 'color',
        dataIndex: 'color'
    },{
        title: '字体大小',
        key: 'size',
        dataIndex: 'size'
    },{
        title: '内容',
        key: 'text',
        dataIndex: 'text'
    },{
        title: '弹幕提交时间',
        key: 'create',
        dataIndex: 'create'
    },{
        title: '弹幕提交者',
        key: 'sender',
        dataIndex: 'sender'
    }
]

export default class DanmuDataTable extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {csv_data} = this.props;
        return <Table 
                 columns = {columns}
                 dataSource = {csv_data}
                 />
    }
}