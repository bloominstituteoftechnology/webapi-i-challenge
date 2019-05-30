import React from "react";
//import { Route, NavLink } from "react-router-dom";
import "./App.css";
import UserList from "./components/UserList";

class App extends React.Component {
  render() {
      return (
        <div className="App">
          < UserList />
        </div>
      );
    }
  }


export default App;
