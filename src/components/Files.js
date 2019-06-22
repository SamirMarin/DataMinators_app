import React, { Component } from 'react'
import '../css/App.css'
import * as helpers from '../utils/helpers'
import * as api from '../utils/api'
import { addFiles } from '../actions'
import { connect } from 'react-redux'


class Files extends Component {
  componentDidMount() {
    //this.getFilesInFolder(this.props.dataFolder + "/" + this.props.tenantDataFolder + "/" + this.props.timestampDataFolder)
  }


  getFilesInFolder = (folderPath) => {
    if(folderPath){
      api.getFilePaths(helpers.configurePath(folderPath)).then((folder) => {
        if (folder.error){
          alert("Error getting Files")
        } else {
          this.props.addFiles({ 
            folderName: this.props.dataFolder,
            tenantFolderName: this.props.tenantFolderName,
            timestampFolderName: this.props.timestampDataFolder,
            files: folder.files 
          })
        }
      })

    }
  }
  render() {
    return(
      <div>
        <ol className="file-list">
          { this.props.files.map((file) => (
            <li key={file}>
              <div>
                <div>
                  {file}
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
    addFiles: (data) => dispatch(addFiles(data)),
  }
}

function mapStateToProps( { fileSystem }, props ) {
  if (props.dataFolder && 
    (props.dataFolder in fileSystem) && 
    props.tenantDataFolder in fileSystem[props.dataFolder] && 
    props.timestampDataFolder in fileSystem[props.dataFolder][props.tenantDataFolder]) {
    return {
      files: fileSystem[props.dataFolder][props.tenantDataFolder][props.timestampDataFolder]
    }
  } else {
    return {
      files: []
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Files)
