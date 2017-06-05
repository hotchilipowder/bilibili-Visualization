import React, {Component} from "react";
import { Table } from 'antd'

const columns = [
    {
        title: '出现时间',
        key: 'showTime',
        dataIndex: 'showTime'
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

export default class DanmuDataTable extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {data} = this.props;
        return <Table 
                 columns = {columns}
                 dataSource = {data}
              />
    }
}