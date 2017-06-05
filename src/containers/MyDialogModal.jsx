import React,{Component} from "react";
import { Modal, Button, Table, Row, Col } from 'antd';
import '../../node_modules/antd/lib/modal/style/index.less'
import '../../node_modules/antd/lib/button/style/index.less'
import {getDanmuXml, getCid, getVideoUpTime, getVideoLen } from '../apis/apis'
import {parseXML} from '../utils/utils'
import DanmuAera from '../components/DanmuAera'
import DanmuUpload from '../components/DanmuUpload'
import DanmuPie from '../components/DanmuPie'
import DanmuDCVis from '../components/DanmuVisDc'
import './MyDialogModal.css'

export default class MyDialogModal extends Component{
  state = { 
    visible: false,
    data: "",
    csv_data: [],
    video_up_time: 0,
    video_len: 0,
    cid: ''
  }

  async refresh(){
    const cid = await getCid();
    const {data} = await getDanmuXml(cid);
    const video_len = await getVideoLen();
    const csv_data= parseXML(data,video_len);
    const video_up_time = await getVideoUpTime();
    this.setState({
      data,
      csv_data,
      cid,
      video_up_time,
      video_len
    });
  }

  componentWillMount(){
    this.refresh()    
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  
  render() {
    console.log(this.state);
    const dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }];

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="75%"
          height="100%"
          style={{top:45}}
        > 
        <DanmuDCVis {...this.state}/>
        <div className="vis-custom">

          <Row className="data-row">
					  <DanmuAera />
          </Row>
           <Row className="data-row">
            <DanmuUpload />
          </Row>

          <Row className="data-row" style={{height: "300px"}}>
            <Col span={8}>
              <DanmuPie />
            </Col>
             <Col span={8}>
             <DanmuPie />
            </Col>
             <Col span={8}>
             <DanmuPie />
            </Col>
          </Row>

          <Row className="data-row">
            <Table dataSource={dataSource} columns={columns} />
          </Row>
        </div>
		  </Modal>
		</div>
    );
  }
}