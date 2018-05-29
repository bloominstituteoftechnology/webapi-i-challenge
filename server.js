const express = require("express");

const db = require("./data/db");

const port = 5555;
const server = express();

server.use(express.json());

/**
 * First argument: route to where a resource can be interacted with => the URL
 * Second argument: Callback to dela with the request
 * req: HTP request
 * res: response
 */
server.get("/", (req, res) => {
  // res.send("Hello from express");
  // res.json("Hello from express");
  db
    .find()
    .then(response => {
      console.log("response", response);
      console.log(typeof response);
      res.send(response);
    })
    .catch(e => {
      console.log("error", e);
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
});

server.listen(port, () => console.log(`Server running on port ${port}`));
