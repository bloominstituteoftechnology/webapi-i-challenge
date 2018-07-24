const express = require("express");

let hobbits = [
  {
    id: 1,
    name: "Frodo Baggins"
  },
  {
    id: 2,
    name: "Bilbo Baggins"
  }
];

let nextId = 3;

const server = express();
server.use(express.json());

const db = require("./data/db");

//configure routing/endpoints
server.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// HOBBITS
server.get("/hobbits", (req, res) => {
  const sortField = req.query.sortby || "id";

  const response = hobbits.sort((a, b) => {
    return a[sortField] < b[sortField] ? -1 : 1;
  });

  res.status(200).json(response);
});

server.post("/hobbits", (req, res) => {
  // const hobbit = req.body;
  // hobbit.id = nextId++;
  const hobbit = { id: nextId, ...req.body };

  hobbits.push(hobbit);

  res.status(200).json(hobbits);
});

server.delete("/hobbits/:id", (req, res) => {
  const { id } = req.params;
  // delete the hobbit....wich one

  hobbits = hobbits.filter(h => h.id != id);

  res.status(200).json(hobbits);
});

server.put("/hobbits/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const format = req.query.format || "short"; // [ s, extended ]

  // update the hobbit
});

// USERS
server.get("/users", async (req, res) => {
  try {
    const users = await db.find();
  } catch (err) {
    res.status(500).json({ message: "sorry we failed you", err: err });
  }

  res.status(200).json(users);

  // db.find()
  //   .then(users => {
  //     res.status(200).json(users);
  //   })
  //   .catch(err => res.status(500).json({ message: "Sorry we failed you" }));
});

// server.get('/users', (req, res) => {
//   db
//     .find()
//     .then(users => )
//     .catch(res.status(500))
// })

server.listen(8000, () => console.log("API RUNNING ON PORT 8000..."));
