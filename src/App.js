import React, { Component } from 'react';
import './App.css';
import {Table, Icon} from 'antd'
import crossfilter from 'crossfilter'
import MyDialogModal from './containers/MyDialogModal'
import {dp_search} from './utils/utils'
import {getQEtest} from './apis/apis.js'
import 'antd/dist/antd.css'

class App extends Component {
  state = {
    tree: {}
  }
  test(){
  	getQEtest().then(res=>{
  		const data = res.data.data;
  		const {partition_columns, partitions} = data;
  		const data_list = [];
  		partitions.forEach((item, index, array)=>{
  			const data_item = item;
  			partition_columns.forEach((item2, index, array)=>{
  				data_item[item2] = item.partition_value.length > index ? item.partition_value[index] : 'others'
  			});
  			data_list.push(data_item);
  		});

  		let parititon_data = crossfilter(data_list);


  		console.log(parititon_data)
  	})
  	.catch(res=>{
  		console.log(res)
  	})
  }


  build_tree(){
    getQEtest().then(res=>{
      const data = res.data.data;
      const { partitions } = data;
      const root = {}
      root.children = {}
      root.open = 1
      // // for loop instead of forEach
      // for(let i = 0;i<partitions.length; i++){
      //   let tree = root;
      //   const partition_value = partitions[i].partition_value
      //   for(let j = 0; j<partition_value.length; j++)
      // }

      partitions.forEach((item, index, array)=>{
        let tree = root.children;
        const partition_value_list = item.partition_value;
        partition_value_list.forEach((item2, index, array)=>{
          if(item2 in tree){
            tree[item2].last_ddl_time = tree[item2].last_ddl_time > item.last_ddl_time? tree[item2].last_ddl_time: item.last_ddl_time
            tree[item2].total_size += parseInt(item.total_size);
            tree[item2].num_rows += parseInt(item.num_rows)
          }else{
            tree[item2] = {
              last_ddl_time: item.last_ddl_time,
              total_size: parseInt(item.total_size),
              num_rows: parseInt(item.num_rows),
              open: 0,
              children: {}
            }
          }
          tree = tree[item2].children;
        })
      });

      const dataSourcePartition = dp_search(root);

      this.setState({
        tree: root,
        dataSourcePartition
      });

    })
    .catch(res=>{
      console.log(res)
    })
  }

  componentWillMount() {
    this.build_tree(); 
  }
 
  unFolder(path, flag=1){
    const tree = this.state.tree;
    let node = tree;
    path.forEach((item, index, array)=>{
      node = node.children[item];
    })
    node.open = flag
    this.setState({
      tree
    },()=>{
      const dataSourcePartition =  dp_search(this.state.tree);
      this.setState({
        dataSourcePartition
      })
    })

  }

  render() {
    const columnsPartition = [{
      title: '分区',
      key: 'partition_value',
      render: (text)=>{
        return <div>
                <Icon type={text.flag? "down": "right"}  onClick={()=> this.unFolder(text.path, Math.abs(text.flag - 1))}/>
                <a>{text.name}</a>
                </div>
      }
    }, {
      title: '行数',
      key: 'num_rows',
      render: (text)=>{
        return text.num_rows
      }
    }, {
      title: '最后更新时间',
      key: 'last_ddl_time',
      render: (text)=>{
        return text.last_ddl_time
      }
    }, {
      title: '大小',
      key: 'total_size',
      render: (text)=>{
        return text.total_size
      }
    }]
    console.log(this.state.tree);
    console.log(this.state.dataSourcePartition);

    return (
    	<div>
        <Table 
          dataSource={this.state.dataSourcePartition}
          columns={columnsPartition}
          pagination={false}
          scroll={{ x: true }}
          wrapClassName="modal-container"
          bordered
        />
          	<MyDialogModal />
        </div>
    );
  }
}

export default App;
