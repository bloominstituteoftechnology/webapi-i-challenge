// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require('./data/db.js');
// const helmet = require('helmet');

// creates an express application using the express module
const server = express();
server.use(express.json());
// server.use(helmet());

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});

let hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];

  let nextId = 3;

server.get('/hobbits', (req, res) => {
    res.status(200).json(hobbits);
});

server.get('/hobbits', (req, res) => {
    const sortField = req.query.sortby || 'id';

    const response = hobbits.sort((a,b) => {
        return a[sortField] < b[sortField] ? -1 : 1;
    })


    res.status(200).json(response);

})

server.post('/hobbits', (req,res) => {
    const hobbit = { id: nextId++, ...req.body };
    console.log(hobbit);
    hobbits.push(hobbit);

    res.status(200).json(hobbits);
})

server.delete('/hobbits/:id', (req, res) => {
    const { id } = req.params;

    hobbits = hobbits.filter(h => h.id != id);
    res.status(200).json(hobbits);
})

server.put('/hobbits/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    const format = req.query.format || 'short';

    
})







server.get('/users', async (req, res) => {
    try{
        const users = await db.find();
        res.status(200).json(users);

    }   catch(err) {
        res.status(500).send({ error: "The users information could not be retrieved." })
    }
    
    // return db
    // .find()
    // .then(result => {
    //     res.json(result);
    // })
    // .catch(() => {
    //     res.status(500).send({ error: "The users information could not be retrieved." })
    // })
})


server.get('/users/:id', async (req, res) => {
    try {
        const user = await db.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).send({ error: "The users information could not be retrieved." })
    }
})


server.post('/users', (req, res) => {
    const { name, bio } = req.body
    if(!name || !bio){
        res.status(400).send({ errorMessage: "Please provide name and bio for the user." })
    }
    return db
    .insert({   
        name: name,
        bio: bio,
        // created_at: Date.now(),
        // updated_at: Date.now()
    })
    .then(user => {
        res.status(201).send(user)
    })
    .error(err => {
        res.status(500).send(err)
    })
})





// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(9000, () => console.log('API running on port 9000'));