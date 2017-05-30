import React,{Component} from "react";
import { Modal, Button, Table } from 'antd';
import '../../node_modules/antd/lib/modal/style/index.less'
import '../../node_modules/antd/lib/button/style/index.less'
import {getDanmuXml, getCid} from '../apis/apis'
import {parseXML} from '../utils/utils'
import {visualize} from '../components/visualize'
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

  componentDidMount() {
  	let cid = '17997926';
  	getCid().then(res=>{
  		cid = res;
  		console.log(cid, '31 line');

		getDanmuXml(cid)
	  	   .then(res=>{
	  	   	let danmu = res.data;
	  	   	console.log(danmu);
	  	   	danmu = parseXML(danmu);
	  	   	visualize(danmu);

	  	   })
	  	   .catch(res=>{
	  	   	console.log(res)
	  	   })

  	});
  

  }

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
        >
		<div className="vis-custom">
			<Table dataSource={dataSource} columns={columns} />
			<div id="danmu-line-chart"></div>
		 	<div className="chart-title text-center">弹幕出现时间</div>
		    <div id="danmu-volume-chart">
		    	<span className="reset" >
		    		<span>range: </span>
		    		<span className="filter"></span>
		    	</span>
			</div>
			<div id="danmu-up-chart"></div>
			<div className="row">
		      <div id="color-chart" className="col-md-4 pie-chart">
		          <strong className="pie-title">颜色分布情况</strong>
		       </div>
		      <div id="pos-chart">
		          <strong className="pie-title">位置分布情况</strong>
		      </div>
		      <div id="char-chart">
		          <strong className="pie-title">弹幕长度分布情况</strong>
		      </div>
		    </div>

		    <p>Some contents...</p>
		    <p>Some contents...</p>
		    <p>Some contents...</p>
		  </div>
		  </Modal>
		</div>
    );
  }
}