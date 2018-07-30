const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/users", (req, res) => {
  const users = [
    {
      name: "Jane", // String, required
      bio: "Doe", // String, required
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    }
  ];

  res.status(200).json(users);
});

server.listen(8000, () => console.log("API running on port 8000"));
