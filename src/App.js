import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css';
import * as filesAPI from './filesAPI'
import Files from './Files'

class App extends Component {
  state = {
    files: ['Nothing has been searched'],
    query: '',
    thepath: ''
  }

  searchQuery = (query) => {
    if(query){
      filesAPI.getFilePaths(query).then((searchPath) => {
        if (searchPath.error){
          this.setState({files : ['nothing has been searched']})
        } else{
          this.setState({files: searchPath.files})
          this.setState({thepath: query})
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
      <div className="App">
          <Route path="/search" render={() => (
            <div className="search-books">
              <div>
                <h2>NOW</h2>
              </div>
              <Link 
                to="/"
              >Close</Link>
              <div className="search-books-bar">
                  <input 
                    type="text" 
                    placeholder="Path to Explore"
                    value={this.state.query}
                    onChange={(event) => this.searchQuery(event.target.value)}
                  />
              </div>
              <Files
                files={this.state.files}
                thepath={this.state.thepath}
              />
            </div>
          )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
              <Files
                files={this.state.files}
                thepath={this.state.thepath}
              />
          </div>
        )}/>
      </div>
    );
  }
}

export default App;
