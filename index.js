const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.post('/users', async (req, res) => {
    const user = req.body;

    if(user.name && user.bio) {
        try {
            const response = await db.insert(user);
            res.status(201).json({ message: 'User created Successfully '});
        } catch(ex) {
            res.status(500).json({
                title: 'Error adding user',
                description: ' what happends',
                recoveryInstructions: 'this is what you do',
            })
        }
    } else {
        res.status(422).json({ message: 'a user needs both a name and bio' });
    }
})

server.get('/', (req, res) => {
    res.send('FSW12');
});

server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.error('error', err);

            res.status(500).json({ message: 'Error getting your data' });
        });
});

server.listen(9000, () => console.log('\n== API on port 9K ==\n'));