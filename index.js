// import your node modules
const express = require("express"); //CommonJS modules
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
//the same as import express from 'express'; //ES2015 modules

const db = require("./data/db.js"); //<======this
const server = express();

//configure middleware for ther server
server.use(express.json()); //this teaches express how to parse JSON info from req.body
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());

server.get("/download", (req, res, next) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath, (err) => {
    // if there is an error the callback function will get an error as it's first argument
    if (err) {
      // we could handle the error here or pass it down to error-handling middleware like so:
      next(err); // call the next error-handling middleware in the queue
    } else {
      console.log("File sent successfully");
    }
  });
});

//configure routing (routing is also a form of middleware)
server.post("/api/posts", async (req, res) => {
  //http message = headers + body(data)
  const post = req.body; //this requies the express.json() middleware

  if (post.name && post.bio) {
    try {
      const response = await db.insert(post);
      res.status(201).json({ message: "User created successfully" });
      //200-299: success, 300-399: redirection, 400-499: client error, 500+: server error
    } catch (err) {
      // handle error
      res.status(500).json({
        error: "There was an error while saving the post to the database."
      });
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }

  //Alternative way of writing my code db
  // db.insert(user)
  //   .then(response => response.status(201).json(response))
  //   .catch(err => res.status(500).json(err));
});

server.get("/", (req, res) => {
  res.send("Hello FSW12");
});

//using query string: http://localhost:9000/users ? sort=asc & field=name
server.get("/api/posts", (req, res) => {
  // const { sort, field } = req.query;
  db.find()
    .then((posts) => {
      //({sortedBy: field, sortOrder: sort, users})
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.error("Error:", err);

      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params; //const id = req.params.id;

  db.remove(id)
    .then((count) => {
      console.log("Count: ", count);
      if (count) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});

server.put("/api/posts/:id", (req, res) => {
  if (req.body.title && req.body.contents) {
    db.update(req.params.id, req.body)
      .then((users) => {
        if (users) {
          res.status(200).json(users);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })
      .catch((err) =>
        res
          .status(500)
          .json({ error: "The post information could not be modified." })
      );
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
});

server.use(errorHandler);

//start the server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));

function errorHandler(err, req, res, next) {
  console.error(err);

  switch (err.statusCode) {
    case 404:
      res.status(404).json({
        message: "There was an error performing the required operation"
      });

      break;

    default:
      res.status(500).json({
        message: "There was an error performing the required operation"
      });

      break;
  }
}
