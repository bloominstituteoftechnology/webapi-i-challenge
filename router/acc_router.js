const express = require("express");
const Acc = require("../data/db");

const router = express.Router();

router.use(express.json());

router.get("/users", (req, res) => {
  Acc.find()
    .then(acc => {
      res.status(200).json(acc);
    })
    .catch(error => {
      res.status(500).json({ message: "error getting the list of acc" });
    });
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;

  Acc.findById(id)
    .then(user => {
      if (user) {
        res.status(201).json({ user });
      } else {
        res.status(400).json({ error: "user id not found" });
      }
    })
    .catch(err => {
      response.status(500).json({ error: "error getting user information" });
    });
});

router.post("/users", (req, res) => {
  const accInformation = req.body;

  if (!accInformation.bio || !accInformation.name) {
   return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  }

  Acc.insert(accInformation)
    .then(acc => {
      res.status(201).json(acc);
    })
    .catch(error => {
      res.status(500).json({ message: "error adding the acc" });
    });
});

router.delete("/users/:id", (req, res) => {
  const accId = req.params.id;

  Acc.remove(accId)
    .then(acc => {
      res.status(200).json({ message: "acc deleted successfully" });
    })
    .catch(error => {
      res.status(500).json({ message: "error removing the acc" });
    });
});

router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Acc.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "acc not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error updating acc" });
    });
});

module.exports = router;
