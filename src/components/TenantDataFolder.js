import React, { Component } from 'react';
import '../css/App.css';
import * as helpers from '../utils/helpers'
import * as api from '../utils/api'
import { addTimeStampFolder, addFiles, switchTimeStampFolderShow, addFolder } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import  Files from './Files'
import Loading from 'react-loading'

class TenantDataFolder extends Component {
  state = {
    num_folders: 0
  }
  componentDidMount() {
    this.getTimeStampFolders(this.props.dataFolder + "/" + this.props.tenantDataFolder)
  }

  getTimeStampFolders = (dataFolder) => {
    if(dataFolder){
      api.getFilePaths(helpers.configurePath(dataFolder)).then((folders) => {
        if (folders.error){
          alert("Error getting folders")
        } else {
          this.setState({
            ...this.state,
            ['num_folders']: folders.dir.length
          })
          this.props.addFolder({ folderName: this.props.dataFolder, tenantDataFolder: this.props.tenantDataFolder }).then(() => {
            for (var i = 0, len = folders.dir.length; i < len; i++) {
              this.props.addTimeStampFolder({ folderName: this.props.dataFolder, tenantFolderName: this.props.tenantDataFolder, timestampFolderName: folders.dir[i] })
            }
          })
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
  getFilesHolder = (one, two) => {
    {}
  }
  //onClick={() => this.getFilesInFolder(this.props.dataFolder + "/" + this.props.tenantDataFolder + "/" + folder, folder)}

  //onClick={() => this.props.switchTimeStampFolderShow({ folderName: this.props.dataFolder, tenantFolderName: this.props.tenantDataFolder, timestampFolderName: folder })}
  render() {
    return (
      <div>
        {this.state.num_folders > 0 && this.props.dataFolders.length === this.state.num_folders
            ? <ol className="folders-grid">
              { this.props.dataFolders.map((folder) => (
                <li key={folder}>
                  <div className="maindata-folder">
                    <div 
                      className="esldata-button"
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
            : <div>
              <Loading type={"bubbles"} color={"#222"} className='loading'/>
            </div>}
      </div>
    )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    addTimeStampFolder: (data) => dispatch(addTimeStampFolder(data)),
    addFiles: (data) => dispatch(addFiles(data)),
    switchTimeStampFolderShow: (data) => dispatch(switchTimeStampFolderShow(data)),
    addFolder: (data) => {
      return new Promise((resolve, reject) => {
        dispatch(addFolder(data))
        resolve()
      })
    }
  }
}

function mapStateToProps({ fileSystem }, props) {
  if (props.dataFolder && (props.dataFolder in fileSystem) && props.tenantDataFolder in fileSystem[props.dataFolder]) {
    return {
      dataFolders: [...Object.keys(fileSystem[props.dataFolder][props.tenantDataFolder])],
      dataFolder_obj: fileSystem[props.dataFolder][props.tenantDataFolder]
    }
  } else {
    return {
      dataFolders: [],
      dataFolder_obj: {}
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TenantDataFolder)
