import React, { Component } from 'react';
import '../css/App.css';
import * as helpers from '../utils/helpers'
import * as api from '../utils/api'
import { addTimeStampFolder, addFiles } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import  Files from './Files'

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

  getFilesInFolder = (folderPath, timestampDataFolder) => {
    if(folderPath){
      api.getFilePaths(helpers.configurePath(folderPath)).then((folder) => {
        if (folder.error){
          alert("Error getting Files")
        } else {
          this.props.addFiles({ 
            folderName: this.props.dataFolder,
            tenantFolderName: this.props.tenantDataFolder,
            timestampFolderName: timestampDataFolder,
            files: folder.files 
          })
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
                <div 
                  className="esldata-button"
                  onClick={() => this.getFilesInFolder(this.props.dataFolder + "/" + this.props.tenantDataFolder + "/" + folder, folder)}
                >
                  <div>
                    {folder}
                  </div>
                    <Files
                      dataFolder={this.props.dataFolder}
                      tenantDataFolder={this.props.tenantDataFolder}
                      timestampDataFolder={folder}
                    />

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
    addFiles: (data) => dispatch(addFiles(data))
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
