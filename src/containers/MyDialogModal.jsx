import React,{Component} from "react";
import { Modal, Button, Table, Row, Col } from 'antd';
import '../../node_modules/antd/lib/modal/style/index.less'
import '../../node_modules/antd/lib/button/style/index.less'
import {getDanmuXml, getCid} from '../apis/apis'
import {parseXML} from '../utils/utils'
import DanmuAera from '../components/danmuAera'
import DanmuUpload from '../components/danmuUpload'
import DanmuPie from '../components/danmuPie'
import './MyDialogModal.css'

export default class MyDialogModal extends Component{
  state = { visible: false }
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

  // componentDidMount() {
  // 	let cid = '17997926';
  // 	getCid().then(res=>{
  // 		cid = res;
  // 		console.log(cid, '31 line');

	// 	getDanmuXml(cid)
	//   	   .then(res=>{
	//   	   	let danmu = res.data;
	//   	   	console.log(danmu);
	//   	   	danmu = parseXML(danmu);
	//   	   })
	//   	   .catch(res=>{
	//   	   	console.log(res)
	//   	   })
  // 	});
  // }

  render() {
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
        > 
          <Row className="data-row">
					  <DanmuAera />
          </Row>
           <Row className="data-row">
            <DanmuUpload />
          </Row>
          <Row style={{ marginLeft: "7%", height:"400px"}} className="data-row">
            <Col span={10} offset={3}>
              <DanmuPie />
            </Col>
             <Col span={10}>
              <DanmuPie />
            </Col>

             <Col span={10}>
              <DanmuPie />
            </Col>
          </Row>
          <Row className="vis-custom">
          <Table dataSource={dataSource} columns={columns} />
          </Row>
		  </Modal>
		</div>
    );
  }
}