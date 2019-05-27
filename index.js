const db = require("./data/db.js");
const { users } = db;



// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require("express");

// creates an express application using the express module
const server = express();
server.use(express.json());

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts

server.get("/api/", (req, res) => {
  res.send("Hello world from WEBAPI-I-CHALLENGE!");
});

// server.get("/api/hobbits", (req, res) => {
//   const hobbits = [
//     {
//       id: 1,
//       name: "Samwise Gamgee"
//     },
//     {
//       id: 2,
//       name: "Frodo Baggins"
//     }
//   ];

//   res.status(200).json(hobbits);

// });

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .send({ error: "The users information could not be retrieved." });
    });
});


server.post("/api/users", (req, res) => {
  const {name, bio} = req.body;
  console.log('req.body', req.body);

  db.insert({name, bio})
  .then(addedUser => {
    res.status(201).json( {addedUser} )
})
  .catch(err => {
    res
      .status(501)
      .send({ error: "The users information could not be added." });
  }); 
})

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
  .then(removedUser => {
    res.status(201).json(removedUser)
  })
  .catch(err => {
    res
      .status(501)
      .send({ error: "The users information could not be added." });
  }); 

})


server.listen(8000, () => console.log("API running on port 8000"));
