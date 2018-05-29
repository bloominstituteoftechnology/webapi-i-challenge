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
  /**
   * from: https://stackoverflow.com/questions/35198208/handling-cancelled-request-with-express-node-js-and-angular?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
   */
  req.on('close', err => {
    res.send("Request cancelled");
  })

  /**
   * GET: users-form-db.then(send to client)
   */
  db
    .find()
    .then(response => {
      console.log("response", response);
      console.log(typeof response);
      res.send(response);
    })
    .catch(e => {
      console.log("error", e);
      res.json({ error: "The users information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
});

server.listen(port, () => console.log(`Server running on port ${port}`));
