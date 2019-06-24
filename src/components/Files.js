import React, { Component } from 'react'
import '../css/App.css'
import * as helpers from '../utils/helpers'
import * as api from '../utils/api'
import { addFiles, switchTimeStampFolderShow } from '../actions'
import { connect } from 'react-redux'


class Files extends Component {
  state = {
    files_object: this.props.files_object,
    file: ""

  }
  componentDidMount() {
    this.getFilesInFolder(this.props.dataFolder + "/" + this.props.tenantDataFolder + "/" + this.props.timestampDataFolder)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      ['files_object']: this.props.files_object
    })
  }

  checkOnlyOne = (file, prevFile) => {
    this.setState({
      ...this.state,
      ['files_object']:{
        ...this.state['files_object'],
        [file]:{
          ...this.state['files_object'][file],
          ["checkbox"]: "checked"
        },
        [prevFile]:{
          ...this.state['files_object'][prevFile],
          ["checkbox"]: ""
        }
      },
      ['file']: file
    })
  }
  unCheckOnlyOne = (file) => {
    if (!(file === "")){
      this.setState({
        ...this.state,
        ['files_object']:{
          ...this.state['files_object'],
          [file]:{
            ...this.state['files_object'][file],
            ["checkbox"]: ""
          }
        }
    })
    }
  }
  onCheckbox = (file, prevFile) => {
    this.checkOnlyOne(file, prevFile)
    //this.unCheckOnlyOne(prevCheck)
    //this.setState({
    //  ...this.state,
    //  ['file']: file
    //})
  } 
  getFilesInFolder = (folderPath) => {
    if(folderPath){
      api.getFilePaths(helpers.configurePath(folderPath)).then((folder) => {
        if (folder.error){
          alert("Error getting Files")
        } else {
          this.props.addFiles({ 
            folderName: this.props.dataFolder,
            tenantFolderName: this.props.tenantDataFolder,
            timestampFolderName: this.props.timestampDataFolder,
            files: folder.files 
          })
        }
      })

    }
  }
  render() {
    return(
      <div className="file-list">
        {this.props.show_files && !(Object.keys(this.state.files_object).length === 0)
            ? <ol className="file-list">
              <div 
                className="show_pointer"
                onClick={() => {this.props.switchTimeStampFolderShow({
                  folderName: this.props.dataFolder,
                  tenantFolderName: this.props.tenantDataFolder,
                  timestampFolderName: this.props.timestampDataFolder,
                })}}
              > x </div>
              { this.props.files.map((file) => (
                <li key={file} className="show_pointer">
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        checked={this.state.files_object[file]["checkbox"]}
                        onChange= {() => this.onCheckbox(file, this.state.file) }
                      />
                      {file}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            : <div 
              className="file-list"
              onClick={() => {this.props.switchTimeStampFolderShow({
                folderName: this.props.dataFolder,
                tenantFolderName: this.props.tenantDataFolder,
                timestampFolderName: this.props.timestampDataFolder,
              })}}
            >
              <div className="show_pointer"> > </div>
            </div>}
          </div>
    )
  }


}

function mapDispatchToProps( dispatch ) {
  return {
    addFiles: (data) => dispatch(addFiles(data)),
    switchTimeStampFolderShow: (data) => dispatch(switchTimeStampFolderShow(data))
  }
}

function mapStateToProps( { fileSystem }, props ) {
  if (props.dataFolder && 
    (props.dataFolder in fileSystem) && 
    props.tenantDataFolder in fileSystem[props.dataFolder] && 
    props.timestampDataFolder in fileSystem[props.dataFolder][props.tenantDataFolder]) {
    return {
      files: fileSystem[props.dataFolder][props.tenantDataFolder][props.timestampDataFolder]['files'],
      files_object: fileSystem[props.dataFolder][props.tenantDataFolder][props.timestampDataFolder]['files'].reduce((files_obj, file) => {
        files_obj[file] = { loaded: true, checkbox: "" }
        return files_obj
      }, {}),
      show_files: fileSystem[props.dataFolder][props.tenantDataFolder][props.timestampDataFolder]['show']
    }
  } else {
    return {
      files: [],
      files_obj: {},
      show_files: false
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Files)
