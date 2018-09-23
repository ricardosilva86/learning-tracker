import React, { Component } from 'react';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import Learning from './components/Learning';

import './index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header branding="Learn Tracker"/>
        <div className="container">
          <Learning />
        </div>
      </div>
    );
  }
}

export default App;
