const express = require('express');
const server = express();

let user = [
    {
        name: 'Jane',
        bio: 'doe',
        created_at: date,
        updated_at: date,
    }
]

server.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
})

server.listen(8000, () => console.log('API running...'))
