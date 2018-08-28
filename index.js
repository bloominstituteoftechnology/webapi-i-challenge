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

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then( count => {
            console.log(count);
            if(count ) {
                res.status(204).end();
            } else {
                res.status(404).json({ message: 'No user with that ID found' });
            }
        } )
        .catch(err => {
            res.status(500).json({ message: 'Could not delete item' });
        })
})

server.put('users/:id', (req, res) => {

})

server.listen(9000, () => console.log('\n== API on port 9K ==\n'));