const express = require("express");

const db = require("./data/db"); // So we have access to the database through our db const. We can rename db to database, or anything.

const server = express();
server.use(express.json()); // Body parser.

let hobbits = [
  {
    id: 1,
    name: "Samwise Gamgee"
  },
  {
    id: 2,
    name: "Frodo Baggins"
  }
];
let nextId = 3;

// Get Request - Hello World
server.get("/", (req, res) => {
  res.send("Hello Worldd");
});

// Get Request - Hobbits
server.get("/hobbits", (req, res) => {
  //res.send(hobbits);
  res.status(200).json(hobbits);
});

// Get Request - Sort
server.get("/hobbits", (req, res) => {
  const sortField = req.query.sortby || "id";
  const response = hobbits.sort(
    (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
  );
  res.status(200).json(response);
});

// Post Request
server.post("/hobbits", (req, res) => {
  const hobbit = { id: nextId++, ...req.body };
  console.log(req.body);
  hobbits.push(hobbit);
  res.status(200).json(hobbits);
});

// Delete Request
server.delete("/hobbits/:id", (req, res) => {
  const { id } = req.params;
  hobbits = hobbits.filter(h => h.id != id);
  res.status(200).json(hobbits);
});

// Update Request
server.put("/hobbits/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const format = req.query.format || "short";
});

// Different Routes
server.get("/about", (req, res) => {
  res.send("About us");
});

server.get("/contact", (req, res) => {
  res.send("About us");
});

// Using Database:
server.get("/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The users information could not be retrieved" })
    ); // Bros - then and catch.
});

// Different way to use get, with async / await:
/*server.get("/users", async (req, res) => {
  try {
    const users = await db.find(); // Telling JS to wait until you have the result of the promise to return the data.
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "sorry we failed you." });
  }
});*/

// Adding users

server.post("/users", (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  const user = { name, bio };
  // if we don't have any name or bio:
  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user"
    });
  } else {
    data.insert(user).then(response =>
      data
        .findById(response.id)
        .then(response => res.status(200).json(response))
        .catch(err =>
          res.status(500).json({
            errorMessage: "The users information could not be retrieved"
          })
        )
    );
  }
});

server.listen(8000, () => console.log("API running on port 8000"));

// immutable operations on the hobbits
// push = nh => h => [...h, nh];
// delete = index => h => [...h.slice(0, index), ...h.slice(index + 1)]

/*


// Getting individual users
server.get("/api/users/:id", (req, res) => {
  data
    .findById(req.params.id)
    .then(response => {
      if (response.length !== 0) {
        return res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "The users information could not be retrieved"
      })
    );
});

// Deleting users
server.delete("/api/users/:id", (req, res) => {
  data
    .findById(req.params.id)
    .then(response => {
      if (response.length === 0) {
        return res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      } else {
        return res.status(200).json({ response });
      }
      data.remove(req.params.id);
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be removed" })
    );
});

server.listen(8000, () => console.log("API is running on port 8000"));*/
