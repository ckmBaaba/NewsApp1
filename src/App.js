import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";




export default class App extends Component {
  pageSize = 10;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }


  render() {


    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            progress={this.state.progress}
            height={3}
            color='red'

          />
          <Routes>

            <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="us" category="general" />} />
            <Route exact path="/Sports" element={<News setProgress={this.setProgress} key="Sports" pageSize={this.pageSize} category="Sports" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category="technology" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="us" category="business" />} />
          </Routes>
        </Router>

      </div>
    )
  }
}