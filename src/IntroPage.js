import React,{Component} from "react";
import { Row, Col, Layout, Menu, Card, Button} from 'antd';
import './IntroPage.less'
import web_clipper1 from './public/img/7992b5cf.web-clipper_05.jpg';
import install_clipper from './public/img/install.gif';
import example_clipper from './public/img/example.gif';

const { Header, Content, Footer } = Layout;


export default class IntroPage extends Component {
	constructor(props) {
		super(props);
		this.state={
			install_read: false
		}
	}

  	render() {
	    return  <Layout className="layout">
				    <Header>
				      <div className="logo" />
				      <Menu
				        theme="dark"
				        mode="horizontal"
				        defaultSelectedKeys={['1']}
				        style={{ lineHeight: '64px' }}
				      >
				        <Menu.Item key="1">功能特色</Menu.Item>
				        <Menu.Item key="2">安装说明</Menu.Item>
				        <Menu.Item key="3">使用说明</Menu.Item>
				        <Menu.Item key="4">投诉建议</Menu.Item>
				      </Menu>
				    </Header>
				    <Content style={{ padding: '0 50px', minHeight: 800 }}>
				      <div style={{ marginTop: 24 }}>
				      	<Card title="功能特色" bordered={false}>
					      <p>获取弹幕分布 ===> 帮助发现最高潮的部分</p>
					      <p>获取弹幕时间 ===> 帮助理解视频弹幕的特点，是隔了一段时间被发现还是一来就火</p>
					      <p>导处视频弹幕 ===> 导出csv</p>
					    </Card>
				      </div>

				      <div style={{ marginTop: 24 }}>
				        <Card title="安装说明(使用书签栏工具)" bordered={false}>

				        <div class="web-clipper">
				        	<h3>找不到书签栏？请使用快捷键Ctrl+Shift+B或者按照图示打开：</h3>
				        <Row type="flex" gutter={32} justify="center">

				        	<Col span={12}>
				        	<img 
				        		src={web_clipper1} 
				        		width="100%" 
				        		alt="找不到书签栏？请使用快捷键Ctrl+Shift+B或者按照图示打开"
				        	/>
				        	</Col>
				        	<Col span={12}>
				        	<a 
				        		onclick="return alert(&quot;请将此链接拖拽到书签栏&quot;),!1" 
				        		href="javascript:(function(){var script=document.createElement('script');script.setAttribute('src','https://h12345jack.github.io/card-Visualization/assets/js/addonvis.js');document.getElementsByTagName('head')[0].appendChild(script);})();" 
				        		id="clipper-bd"
				        	>
				        		可视化B站视频弹幕
				        	</a>
				        	</Col>
				        </Row>
				        	<h3>拖拽演示</h3>
				        	<div>
				        		<img
				        			src={install_clipper}
				        			width="100%"
				        		/>
				        	</div>
				       </div>
					    </Card>
					  </div>

				     <div style={{ marginTop: 24 }}>
				        <Card title="使用说明" bordered={false}>
					      <h3>确保为HTML5播放器，如果网络过慢，可以点击<Button>Refresh</Button></h3>
					      <div>
				        		<img
				        			src={example_clipper}
				        			width="100%"
				        		/>
				          </div>

					    </Card>
					  </div>

					  <div style={{ marginTop: 24 }}>
				        <Card title="投诉建议" bordered={false}>
					      <p>暂无</p>
					    </Card>
					  </div>



				    </Content>
				    <Footer style={{ textAlign: 'center' }}>
				      Bilibili-Vis ©2016 Created by h12345jack Using React
				    </Footer>
			  </Layout>
  }
}
