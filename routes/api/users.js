const express = require('express');
const router = express.Router();
const db = require('../../data/db');


router.get('/', async (req, res) => {
    await db.find().then(users => {
        res.json({ users })
    });
});

router.get('/:id', async (req, res) => {
    await db.findById(req.params.id).then(function (data) {
        res.send(data);
    });
});

router.post('/', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    db.insert({ name, bio, created_at, updated_at }).then(response => {
        res.status(201).json(response);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    db.update(id, { name, bio }).then(response => {
        res.status(201).json(response)
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id).then(response => {
        res.status(200).json({ Success: `User ${id} is gone forever from the system!!` })
    });
});


module.exports = router;