const express = require("express");
const data = require("./data/db");

const server = express();

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get("/", (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send("Hello World");
});

server.get("/hobbits", (req, res) => {
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
  console.log("test");
  res.status(200).json(hobbits);
});



//find
server.get("/users", (req, res) => {
  data
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ error: "The users information could not be retrieved." });
    });
});

//Post
server.post('/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    if (!name || !bio) {
        sendUserError(400, 'Must provide name and bio', res);
        return;
      }
      data
        .insert({
          name,
          bio,
          created_at,
          updated_at
        })
        .then(response => {
          res.status(201).json(response);
        })
        .catch(error => {
          console.log(error);
          sendUserError(400, error, res);
          return;
        });
    });



//findbyid
server.get("/users/:id", (req, res) => {
    data
    .findById(req.params.id)
    .then(user => {
        if (user.length === 0) {
            res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(user);
    })
    .catch(error => {
        res
        .status(500)
        .json({error: "User info could not be retrieved"})
    })
    });  








// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log("API running on port 8000"));
