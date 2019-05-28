import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css';
import * as filesAPI from './filesAPI'

class App extends Component {
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
      <div className="App">
          <Route path="/search" render={() => (
            <div className="search-books" onClick={(target) => this.searchQuery(event.target.value)}>
              <div>
                <h2>NOW</h2>
              </div>
              <div className="search-books-bar">
                  <input 
                    type="text" 
                    placeholder="Path to Explore"
                    value={this.state.query}
                    onChange={(event) => this.searchQuery(event.target.value)}
                  />
              </div>
              <div>
                <h2>{this.state.files[0]}</h2>
              </div>
            </div>
          )}/>
      </div>
    );
  }
}

export default App;
