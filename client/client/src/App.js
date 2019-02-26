import React, { Component } from "react";
import "./App.css";
import ChatWindow from "./Components/ChatWindow";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatWindow />
      </div>
    );
  }
}

export default App;
