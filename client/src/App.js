import React, { Component } from "react";
import axios from "axios";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5555/api/users")
      .then(response => {
        const data = [...response.data];
        console.log("response.data", response.data, data);
        this.setState({ data });
      })
      .catch(e => {
        console.log("error", e);
      });
  }
  render() {
    const { data } = this.state;
    console.log("data", data);

    const toRender = data.map((item, index) => (
      <ListGroupItem active>
        <ListGroupItemHeading>
          <strong>{item.id}</strong>-{item.name}
        </ListGroupItemHeading>
        <ListGroupItemText>{item.bio}</ListGroupItemText>
      </ListGroupItem>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ListGroup>{toRender}</ListGroup>
      </div>
    );
  }
}

export default App;
