const express = require('express');
const server = express();

server.post('/api/users');
server.get('/api/users');
server.get('/api/users/:id');
server.delete('/api/users/:id');
server.put('/api/users/id:');

server.listen(8000, () => console.log('API running on port 8000'));
