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
			console.err(err);
			res.status(500).json({ 
        message: "Error getting the data" 
      });
		});
});

server.post("/users", (req, res) => {
  if (req.body.name && req.body.bio) {
    db.insert(req.body) 
      .then(id => {
        res.status(201).json(id)
      })
      .catch(err => {
        console.err(err);
        res.status(500).json({
          message: "Error posting the data"
        });
      })
  } else {
    return res.status(400).json({
      message: "Please provide a name and bio"
    })
  }
})

//Start server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));