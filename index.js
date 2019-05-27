// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require("express");

// creates an express application using the express module
const server = express();

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts


server.get("/api/", (req, res) => {
  res.send("Hello world from WEBAPI-I-CHALLENGE!");
});

server.get("/api/hobbits", (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: "Samwise Gamgee"
    },
    {
      id: 2,
      name: "Frodo Baggins"
    }
  ];

  res.status(200).json(hobbits);

});


server.listen(8000, () => console.log("API running on port 8000"));