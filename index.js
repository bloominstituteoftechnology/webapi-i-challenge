// imporer texpress in to the server api
const express = require("express");

const server = express(); // instantiate an express server

// skeleton for get all users TODO: fill in logic
server.get("/api/users", (req, res) => {});

// skeleton for get specific user based upon id
server.get("/api/users/:id", (req, res) => {});
