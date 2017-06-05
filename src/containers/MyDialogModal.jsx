import React,{Component} from "react";
import { Modal, Button, Table, Row, Col,Spin } from 'antd';
import '../../node_modules/antd/lib/modal/style/index.less'
import '../../node_modules/antd/lib/button/style/index.less'
import {getDanmuXml, getCid, getVideoUpTime, getVideoLen } from '../apis/apis'
import {parseXML} from '../utils/utils'
import DanmuAera from '../components/DanmuAera'
import DanmuUpload from '../components/DanmuUpload'
import DanmuPie from '../components/DanmuPie'
import DanmuDCVis from '../components/DanmuVisDc'
import DanmuDataTable from '../components/DanmuDataTable'

import '../styles/MyDialogModal.css'

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
        <Spin tips="Loading..." spinning={this.state.video_len > 0? false: true} delay={500}>
          <div className="vis-custom">
            {this.state.video_len && <DanmuDCVis {...this.state} />}
            <Row>
              <Col span={20} offset={2}>
                <DanmuDataTable {...this.state}/>
              </Col>
            </Row>
          </div>
        </Spin>
		  </Modal>
		</div>
    );
  }
}