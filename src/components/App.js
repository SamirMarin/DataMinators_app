import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import '../css/App.css';
import DataFolder from './DataFolder'
import * as helpers from '../utils/helpers'
import * as api from '../utils/api'
import { addFolder } from '../actions'
import { connect } from 'react-redux'

class App extends Component {
  getTenantFolders = (dataFolder) => {
    if(dataFolder){
      api.getFilePaths(helpers.configurePath(dataFolder)).then((folders) => {
        if (folders.error){
          alert("Error getting folders")
        } else {
          for (var i = 0, len = folders.dir.length; i < len; i++) {
            this.props.addFolder({folderName: folders.dir[i]})
          }
        }
      })
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">
            DataMinators
          </h2>
        </header>
        <Switch>
          <Route exact path="/" render= {() => (
            <div className="maindata-folder">
              <div className="esldata-button">
                <Link
                  to="/esldata"
                  onClick={() => this.getTenantFolders("esldata")}
                >esldata</Link>
              </div>
            </div>
          )}/>
        <Route exact path="/esldata" render= {() => (
          <DataFolder/>
        )}/>
    </Switch>
      </div>
    )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    addFolder: (data) => dispatch(addFolder(data)),
  }
}


export default connect(null, mapDispatchToProps)(App);

