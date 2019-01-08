// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();


const PORT = 5000;

//++++++++++++++++++++++++++++++++++++++++++
//get endpoints
//++++++++++++++++++++++++++++++++++++++++++++

server.get('/', (req, res) => {
    res.send('Hello World')
    res.send('<h1>hello there</h1>');
});

server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
            id: 1,
            name: 'samwize Gamgee'
        },
        {
            id: 2,
            name: 'frodo Baggins'
        }
    ];

    // res.status(200).send(hobbits);
    res.status(200).json(hobbits);
});

server.get('/stuff', (req, res) => {
    res.send(200, { message: 'request received'});
});

server.get('/greet/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello There ${name}!`);
});


server.get('/', (req,res)  => {
    db.find()
        .then(users => {
            res.status(418).send(users);
        })
        .catch(err => {
            res.send(err);
        });
});


server.get('/api/users', (req, res) => {
    // res.status(200).json(dbs.find())
    // res.json();
    db.find()
    .then( users => {
        console.log(`users ${users}`);
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: `failed to get users`});
        
    });
     
});

server.get('/api/users/:id', (req, res) => {
    const theId = req.params.id;
    //const { theId } = req.params; on slightly different format.
    // res.status(200).json(`${theId}`);
    db.findById(theId)
        .then( thisUser => {
            console.log(`thisUser ${thisUser}`);
            if (thisUser) {
                res.status(200).json(thisUser);
            } else {
                res.status(404).json({ message: `User does not exist.`})
            }
        })
        .catch(err => {
            res.status(500)
                .json({ message:
                    `We can't find the hommie, please try again later!` })
            // res.status(500).json({ message: `We can't find the hommie, please try again later!` })
        });
});
//++++++++++++++++++++++++++++++++++++++++
// Day 2 - put post delete stuff here
//+++++++++++++++++++++++++++++++++++++

// server.post()
server.post('/api/users', (req, res) => {
    const user = req.body;
    // const user = req.params.body;
    console.log('User from body', user);
    db.insert(user)
        .then(user => {
            console.log('User from insert Method', user);
            res.status(201).json(user);
        })
        .catch( res.status(500).json({ message: `Failed to insert user`})

        );
});


// res.send([
//     ...props.hobbitsList
// ]));





//++++++++++++++++++++++++++++++++++++
//Listener
//++++++++++++++++++++++++++++++++++++++

// server.listen(8000, () => console.log('API Running on 8000'));

server.listen(PORT, () => {
    console.log(`The server is listening on Port ${PORT}`);
});