import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css';
import * as filesAPI from './filesAPI'

class Files extends Component {
  state = {
    files:[],
    tableName: {},
    query: '',
    success: ''
  }

  searchQuery = (query) => {
    if(query){
      filesAPI.getFilePaths(query).then((searchPath) => {
        if (searchPath.error){
          this.setState({files : ['nothing has been searched']})
        } else{
          this.setState({files: searchPath.files})
        }
      })

    }
    else {
      this.setState({ files: ['nothing has been searched'] })
    }
    this.setState({query: query})
  }

  tableName = (file) => {
    if(file in this.state.tableName){
      return this.state.tableName[file]
    }else{
      return "Table Name Goes Here"
    }
  }
  handleChangeInTableName = (event, file) => {
    if(file in this.state.tableName){
      this.state.tableName = {file: event}
    }else{
      this.state.tableName = {file: event}
    }
  }
  handleSubmit = (tableName, file, thepath) => {
      filesAPI.loadTable(this.state.tableName['file'], thepath, file).then((successMessage) => {
        if (successMessage.error){
          this.setState({success : ''})
        } else{
          this.setState({success: "table has loaded"})
        }
      })
    }
  
  render() {
    return (
      <div >
        <ol >
          { this.props.files.map((file) => (
            <li key={file}>
              <div>
                <div>
                  <div>
                  </div>
                </div>
                <div>{this.props.thepath}/{file}</div>
                <form onSubmit ={(e) => this.handleSubmit(this.state.tableName[file], file, this.props.thepath)} >
                  <div className="comment-form-area">
                    <div className="">
                    </div>
                    <br/>
                    <div className="form-padding">
                      <textarea 
                        className="text-box-area"
                        placeholder="Table name goes here"
                        value={this.state.tableName[file]}
                        onChange={(event) => this.handleChangeInTableName(event.target.value)}
                      />
                    </div>
                    <br/>
                    <input 
                      type="submit"
                      className="author-area"
                    />
                  </div>
                  <br/>
                </form>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Files;
