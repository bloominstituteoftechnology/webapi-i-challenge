const express = require("express");
const Users = require("./data/db.js");
const server = express();

server.use(express.json());

//Server.Get users
server.get("/api/users", (req, res) => {
  /*
    If there's an error in retrieving the users from the database:
cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The users information could not be retrieved." }.
*/
  res.send("Hello World");
});

//Server.Get id
server.get("/api/users/:id", (req, res) => {
  /*
    If the user with the specified id is not found:

return HTTP status code 404 (Not Found).
return the following JSON object: { message: "The user with the specified ID does not exist." }.
If there's an error in retrieving the user from the database:

cancel the request.
respond with HTTP status code 500.
return the following JSON object: { error: "The user information could not be retrieved." }.
    */
  res.send("Hello World");
});

//Server.post
server.post("/api/users", (req, res) => {
  if (name && bio) {
    /*
save the new user the the database.
return HTTP status code 201 (Created).
return the newly created user document.
*/
  } else {
    /*cancel the request.
respond with HTTP status code 400 (Bad Request).
return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.

cancel the request.
respond with HTTP status code 500 (Server Error).
return the following JSON object: { error: "There was an error while saving the user to the database" }.
*/
  }
  res.send("Hello World");
});

//Server.put
server.put("/api/users/:id", (req, res) => {
  res.send("Hello World");
});

//Server.delete
server.delete("/api/users/:id", (req, res) => {
  res.send("Hello World");
});

server.listen(8000, () => console.log("API running on port 8000"));
