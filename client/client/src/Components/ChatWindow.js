import React, { useState } from "react";

import "./ChatWindow.css";

const ChatWindow = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ChatWindow;
