import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css';
import * as filesAPI from './filesAPI'

class Files extends Component {
  state = {
    files: ['Nothing has been searched'],
    query: ''
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
                <div>{file}</div>
                <div>{file}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Files;
