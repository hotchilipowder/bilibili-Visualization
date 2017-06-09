import React, { Component } from 'react';
import crossfilter from 'crossfilter'
import MyDialogModal from './containers/MyDialogModal'
import './App.less'

class App extends Component {
  state = {
    tree: {}
  }

  render() {
    return (
    	  <div className="vis-custom">
          	<MyDialogModal/>
        </div>
    );
  }
}

export default App;
