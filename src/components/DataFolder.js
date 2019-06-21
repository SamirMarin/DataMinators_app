import React, { Component } from 'react';
import '../css/App.css';
import { addFolder } from '../actions'
import { connect } from 'react-redux'

class DataFolder extends Component {
  render() {
    return (
      <div>
        <h2>
          Here the esldata or custdata folders
        </h2>
      </div>
    )
  }
}

function mapDispatchToProps( dispatch ) {
  return {
    addFolder: (data) => dispatch(addFolder(data)),
  }
}

export default connect(null, mapDispatchToProps)(DataFolder);
