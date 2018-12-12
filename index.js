// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require("express"); //express is a function
const PORT = 8000;
const db = require("./data/db");

// creates an express application using the express module
const server = express(); //server is an object that contains a bunch of methods we can use

//plug this method in after the server is defined w/ express function AND before endpoints(otherwise it will break), this will return middleware that parses the body
//need this to properly complete the POST request
//if you don't have this, it means its not being parsed by express correctly
server.use(express.json());

//Endpoints:
// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get("/api/users", (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  //let next developer know that this is a json api, intending to return json
  //return json by default
  const { id } = req.params;
  db.findById(id)
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({ message: "user does not exist" });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (user.name && user.bio) {
    db.insert(user)
      .then(idInfo => {
        db.findById(idInfo.id).then(user => {
          //this
          res.status(201).json(user); //201 signifies something has been created in a database
        }); //no .catch for 2nd db, because the catch should catch everything
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: "There was an error while saving the user to the database"
          });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.put("/api/users/:id", (req, res) => {});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id).then(count => {
    if (count) {
      res.json({message: 'successfully deleted'})
    }else {
      res.status(404).json({message: "The user with the specified ID does not exist."})
    }
  }).catch(err => {
    res.status(500).json({error: "The user could not be removed"})
  })
});

//listening only below this line
// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(PORT, () => console.log(`API running on port ${PORT}`));
