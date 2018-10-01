import React, { Component } from 'react';
import StudentList from './StudentList';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Lambda Directory</h1>
          <button className="listButton btn-grad">Click Here For Student List</button>
        </header>
       <div className="studentlist">
       <StudentList/>
       </div>
      </div>
    );
  }
}

export default App;
