import React from "react";

import "./ChatWindow.css";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: "",
      username: "",
      password: "",
      chatMessages: []
    };
  }
  ws = new WebSocket("ws://localhost:40510", "nole-chat-protocol");
  // ws.addEventListener("open", onSocketOpen);
  // ws.addEventListener("close", onSocketClose);
  // ws.addEventListener("error", onSocketError);
  // ws.addEventListener("message", onSocketMessage);

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };
    // this.setState(function (state, props) {
    //   return {
    //    score: state.score - 1
    //   }
    //  });
    this.ws.onmessage = msg => {
      const { payload, type } = JSON.parse(msg.data);
      //  here I need to use a switch statement
      //  as a conditional for the type of message
      // console.log(message);
      switch (type) {
        case "interval":
          console.log(payload);
          break;
        case "chatMessage":
          console.log(payload);
          this.setState(state => {
            return {
              chatMessages: [...state.chatMessages, payload]
            };
          });
          break;
        default:
          break;
      }
    };
  }

  sendMessage = (msg, user) => {
    console.log(msg, user);
    this.ws.send(
      JSON.stringify({
        type: "chatMessage",
        payload: {
          message: msg,
          username: user,
          timeStamp: Date.now()
        }
      })
    );
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <div className="chat-window">
        <div className="chat-output">
          {this.state.chatMessages.map(msgObj => (
            <p key={msgObj.timeStamp}>{msgObj.message}</p>
          ))}
        </div>
        <form action="">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.inputChange}
          />
          <input
            type="text"
            name="chatInput"
            placeholder="message"
            value={this.state.chatInput}
            onChange={this.inputChange}
          />
          <button
            onClick={e => {
              e.preventDefault();
              this.sendMessage(this.state.chatInput, this.state.username);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ChatWindow;
