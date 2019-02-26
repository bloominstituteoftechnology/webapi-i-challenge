import React, { useState, useEffect } from "react";

import "./ChatWindow.css";

const ChatWindow = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  let localURL = parseLocation(window.location);

  let // Create WebSocket
    ws = new WebSocket("ws://" + localURL.host, "beej-chat-protocol");

  const onSocketOpen = e => {
    writeOutput("<i>Connection opened.</i>");

    sendMessage("chat-join", {
      username: username
    });
    console.log("Opened");
  };
  const onSocketClose = e => {
    console.log("Closed");
    writeOutput("<i>Connection closed.</i>");
  };
  const onSocketError = e => {
    console.log("Error");
    writeOutput("<i>Connection error.</i>");
  };
  //on message write to output
  const onSocketMessage = e => {
    console.log("Message");
    let msg = JSON.parse(e.data);
    let payload = msg.payload;

    // Sanitize HTML string
    let username = payload.username;

    switch (msg.type) {
      case "chat-message":
        //no sanitizeation
        writeOutput("<b>" + username + ":</b> " + payload.message);
        break;

      case "chat-join":
        writeOutput("<i><b>" + username + "</b> has joined the chat.</i>");
        break;

      case "chat-leave":
        writeOutput("<i><b>" + username + "</b> has left the chat.</i>");
        break;
      default:
        break;
    }
  };

  /**
   * Send a message to the server
   */
  function sendMessage(type, payload) {
    ws.send(makeMessage(type, payload));
  }

  /**
   * Construct a message
   */
  function makeMessage(type, payload) {
    return JSON.stringify({
      type: type,
      payload: payload
    });
  }

  /**
   * Send a chat message
   */
  function send() {
    sendMessage("chat-message", {
      username: username,
      message: message
    });
  }

  ws.addEventListener("open", onSocketOpen);
  ws.addEventListener("close", onSocketClose);
  ws.addEventListener("error", onSocketError);
  ws.addEventListener("message", onSocketMessage);

  useEffect(() => {}, []);

  /**
   * Break down a URL into its components
   */
  function parseLocation(url) {
    let a = document.createElement("a");
    a.href = url;

    return a;
  }

  /**
   * Write something to the output portion of the screen
   */
  function writeOutput(s) {
    let chatOutput = document.querySelector(".chat-output");
    let innerHTML = chatOutput.innerHTML;

    // Add a newline before new output
    let newOutput = innerHTML === "" ? s : "<br/>" + s;

    chatOutput.innerHTML = innerHTML + newOutput;

    // Scroll to bottom
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  return (
    <div className="chat-window">
      <div className="chat-output">
        <p>palceholder</p>
      </div>
      <form action="">
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="message"
          placeholder="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button
          onClick={e => {
            e.preventDefault();
            writeOutput("test");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
