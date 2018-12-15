// implement your API here
const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hello World')
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

// server.post()


// res.send([
//     ...props.hobbitsList
// ]));

server.listen(8000, () => console.log('API Running on port 8000'));