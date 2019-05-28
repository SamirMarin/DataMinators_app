import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css';
import * as filesAPI from './filesAPI'

class App extends Component {
  state = {
    folder: {},
    query: ''
  }

  searchQuery = (query) => {
    if(query){
      filesAPI.getFilePaths(query).then((searchPath) => {
        if (searchPath.error){
          this.setState({folder : {}})
        } else{
          this.setState({folder: searchPath})
        }
      })

    }
    else {
      this.setState({ folder: {} })
    }
    this.setState({query: query})
  }
  render() {
    return (
      <div className="App">
          <Route path="/" render={() => (
            <div className="list-books-content">
              <div className="search-books-bar">
                <div>
                  <input 
                    type="text" 
                    placeholder="Path to Explore"
                    value={this.state.query}
                    onChange={(event) => this.searchQuery(event.target.value)}
                  />
                </div>
              </div>
              <div>
                <h2>HELLO</h2>
              </div>
            </div>
          )}/>
      </div>
    );
  }
}

export default App;
