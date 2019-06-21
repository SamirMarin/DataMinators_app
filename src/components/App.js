import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import '../css/App.css';
import DataFolder from './DataFolder'
import TenantDataFolder from './TenantDataFolder'
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
                >esldata</Link>
              </div>
            </div>
          )}/>
        <Route exact path="/:dataFolder" render= {(props) => (
          <DataFolder
            dataFolder={props.match.params.dataFolder}
          />
        )}/>
      <Route exact path="/:dataFolder/:tenantDataFolder" render= {(props) => (
          <TenantDataFolder
            dataFolder={props.match.params.dataFolder}
            tenantDataFolder={props.match.params.tenantDataFolder}
          />
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

