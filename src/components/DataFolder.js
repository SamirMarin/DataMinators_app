import React, { Component } from 'react';
import '../css/App.css';
import * as helpers from '../utils/helpers'
import * as api from '../utils/api'
import { addFolder } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class DataFolder extends Component {
  componentDidMount() {
    this.getTenantFolders(this.props.dataFolder)
  }

  getTenantFolders = (dataFolder) => {
    if(dataFolder){
      api.getFilePaths(helpers.configurePath(dataFolder)).then((folders) => {
        if (folders.error){
          alert("Error getting folders")
        } else {
          for (var i = 0, len = folders.dir.length; i < len; i++) {
            this.props.addFolder({ folderName: this.props.dataFolder, tenantFolderName: folders.dir[i] })
          }
        }
      })
    }
  }

  render() {
    return (
      <div>
        <ol className="folders-grid">
          { this.props.folders.map((folder) => (
            <li key={folder}>
              <div className="maindata-folder">
                <div className="esldata-button">
                  <Link
                    to={{
                      pathname: "/esldata/" + folder
                    }}
                    className="App-title-link"
                  >{folder}</Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    addFolder: (data) => dispatch(addFolder(data)),
  }
}

function mapStateToProps({ fileSystem }, props) {
  if (props.dataFolder && (props.dataFolder in fileSystem)) {
    return {
      folders: [...Object.keys(fileSystem[props.dataFolder])]
    }
  } else {
    return {
      folders: []
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataFolder);
