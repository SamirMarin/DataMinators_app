import React, { Component } from 'react';
import '../css/App.css';
import * as helpers from '../utils/helpers'
import * as api from '../utils/api'
import { addTimeStampFolder } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class TenantDataFolder extends Component {
  componentDidMount() {
    this.getTimeStampFolders(this.props.dataFolder + "/" + this.props.tenantDataFolder)
  }

  getTimeStampFolders = (dataFolder) => {
    if(dataFolder){
      api.getFilePaths(helpers.configurePath(dataFolder)).then((folders) => {
        if (folders.error){
          alert("Error getting folders")
        } else {
          for (var i = 0, len = folders.dir.length; i < len; i++) {
            this.props.addTimeStampFolder({ folderName: this.props.dataFolder, tenantFolderName: this.props.tenantDataFolder, timestampFolderName: folders.dir[i] })
          }
        }
      })
    }
  }

  render() {
    return (
      <div>
        <ol className="folders-grid">
          { this.props.dataFolders.map((folder) => (
            <li key={folder}>
              <div className="maindata-folder">
                <div className="esldata-button">
                  {folder}
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
    addTimeStampFolder: (data) => dispatch(addTimeStampFolder(data)),
  }
}

function mapStateToProps({ fileSystem }, props) {
  if (props.dataFolder && (props.dataFolder in fileSystem) && props.tenantDataFolder in fileSystem[props.dataFolder]) {
    return {
      dataFolders: [...Object.keys(fileSystem[props.dataFolder][props.tenantDataFolder])]
    }
  } else {
    return {
      dataFolders: []
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TenantDataFolder)
