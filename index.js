const express = require("express");

const db = require("./data/db");

const server = express();

//configure middleware
server.use(express.json());

//configure routing (also middleware)
server.get("/", (req, res) => {
	res.send("Hello Cs12");
});

server.get("/users", (req, res) => {
	db.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
      console.log(err);
			res.status(500).json({ 
        error: "The users information could not be retrieved." 
      });
		});
});

server.get("/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user.length > 0) {
        res.status(200).json(user)
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.err(err);
      res.status(500).json({
        error: "The user information could not be retrieved."
      })
    }) 
})

server.post("/users", (req, res) => {
  if (req.body.name && req.body.bio) {
    db.insert(req.body) 
      .then(id => {
        res.status(201).json(id)
      })
      .catch(err => {
        console.err(err);
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      })
  } else {
    return res.status(400).json({
      errorMessage: "Please provide a name and bio for the user."
    })
  }
})

server.delete("/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(result => {
      if (result > 0 ) {
        res.status(200).json({
          message: `${result} user were deleted.`
        })
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.err(err);
      res.status(500).json({
        error: "The user could not be removed."
      })
    })
})

server.put("/users/:id", (req, res) => {
  if (!(req.body.name && req.body.bio)) {
    return res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }
  db.update(req.params.id, req.body)
    .then(result => {
      if (result > 0) {
        res.status(200).json({
          id: req.params.id, 
          name: req.body.name,
          bio: req.body.bio
        })
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.err(err);
      res.status(500).json({
        error: "The user information could not be modified."
      })
    })
})

//Start server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));