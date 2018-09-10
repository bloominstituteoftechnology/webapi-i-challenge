const express = require("express");

const db = require("../data/db.js");

const router = express.Router();

// router.use(express.json());
// could use this only if need to parse messages on
// this file.

//this router handles anything that begins with /api
router.post("/", async (req, res) => {
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

// router.get("/", (req, res) => {
//   res.send("Hello FSW12");
// });

//using query string: http://localhost:9000/users ? sort=asc & field=name
router.get("/", (req, res) => {
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

router.get("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
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

module.exports = router;
