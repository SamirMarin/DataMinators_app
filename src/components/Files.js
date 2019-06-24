import React, { Component } from 'react'
import '../css/App.css'
import * as helpers from '../utils/helpers'
import * as api from '../utils/api'
import { addFiles, switchTimeStampFolderShow } from '../actions'
import { connect } from 'react-redux'


class Files extends Component {
  state = {
    files_object: this.props.files_object,
    file: "",
    table_name: "",
  }
  componentDidMount() {
    //this.getFilesInFolder(this.props.dataFolder + "/" + this.props.tenantDataFolder + "/" + this.props.timestampDataFolder)
  }
  componentWillReceiveProps(nextProps) {
    //this.setState({
    //  ...this.state,
    //  ['files_object']: this.props.files_object
    //})
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
    if (!(file === prevFile)){
      this.checkOnlyOne(file, prevFile)
    }
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
          this.setState({
            ...this.state,
            ['files_object']: folder.files.reduce((files_obj, file) => {
              files_obj[file] = { loaded: true, checkbox: "" }
              return files_obj
            }, {})
          })
        }
      })
    }
  }
  handleChangeInTableName = (table_name) => {
    this.setState({
      ...this.state,
      ['table_name']: table_name
    })
  }
  handleCreate = (path) => {
    if(this.state.file === "") {
      alert("Please select a file to load")
    } else if(this.state.table_name === "") {
      alert("Please provide a table name") 
    } else {
      api.loadTable(this.state.table_name, helpers.configurePath(path), this.state.file).then((successMessage) => {
        if (successMessage.error){
          alert("error loading table")
        } else{
          alert("success done loading")
        }
      })
    }
  }
  showFilesInFolder = () => {
    if(Object.keys(this.state.files_object).length === 0) {
      this.props.switchTimeStampFolderShow({
        folderName: this.props.dataFolder,
        tenantFolderName: this.props.tenantDataFolder,
        timestampFolderName: this.props.timestampDataFolder,
      }).then(() => this.getFilesInFolder(this.props.dataFolder + "/" + this.props.tenantDataFolder + "/" + this.props.timestampDataFolder))
      //this.getFilesInFolder(this.props.dataFolder + "/" + this.props.tenantDataFolder + "/" + this.props.timestampDataFolder)
    } else {
      this.props.switchTimeStampFolderShow({
        folderName: this.props.dataFolder,
        tenantFolderName: this.props.tenantDataFolder,
        timestampFolderName: this.props.timestampDataFolder,
      })
    }
}
  
  render() {
    return(
      <div className="file-list">
        {this.props.show_files //&& !(Object.keys(this.state.files_object).length === 0)
            ? <ol className="file-list">
              <div 
                className="show_pointer"
                onClick={() => this.showFilesInFolder()}
              > x </div>
              { this.props.files.map((file) => (
                <li key={file} className="show_pointer">
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        checked={file in this.state.files_object ? this.state.files_object[file]["checkbox"]: ""}
                        onChange= {() => this.onCheckbox(file, this.state.file) }
                      />
                      {file}
                    </div>
                  </div>
                </li>
              ))}
              <textarea 
                className="text-box-area"
                placeholder="Table name"
                onChange={(event) => this.handleChangeInTableName(event.target.value)}
              />
              <div className="create-button" onClick={() => this.handleCreate(this.props.dataFolder + "/" + this.props.tenantDataFolder + "/" + this.props.timestampDataFolder)}>
                 Create 
              </div>
            </ol>
            : <div 
              className="file-list"
              onClick={() => this.showFilesInFolder()}
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
    switchTimeStampFolderShow: (data) => {return new Promise((resolve, reject) => {
      dispatch(switchTimeStampFolderShow(data))
      resolve()
    })
    }
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
