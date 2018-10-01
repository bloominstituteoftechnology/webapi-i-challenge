import React, { Component } from 'react';
import StudentList from './StudentList';
import './App.css';

//Redux
import { connect } from 'react-redux';
import { StudentAction } from './actions/StudentAction';

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  StudentAction: () => dispatch(StudentAction())
})

StudentAction = (event) => {
  this.props.StudentAction();
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Lambda Directory</h1>
          <pre>{
            JSON.stringify(this.props)
          }
          </pre>
          <button className="listButton btn-grad" onClick={this.StudentAction}>Click Here For Student List</button>
        </header>
       <div className="studentlist">
       <StudentList/>
       </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
