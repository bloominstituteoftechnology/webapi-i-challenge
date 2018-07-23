const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);
const server = express();

module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
  };

  function find() {
    return db('users');
  }
  
  function findById(id) {
    return db('users').where({ id: Number(id) });
  }
  
  function insert(user) {
    return db('users')
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  }
  
  function update(id, user) {
    return db('users')
      .where('id', Number(id))
      .update(user);
  }
  
  function remove(id) {
    return db('users')
      .where('id', Number(id))
      .del();
  }

server.get('/', (req, res) => {
    res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
          id: 1,
          name: 'Samwise Gamgee',
        },
        {
          id: 2,
          name: 'Frodo Baggins',
        },
      ];
    
    res.status(200).json(hobbits); 
});

server.get('/users', (req, res) => {
    const users = [
        {
            id: 1,
            name: 'User1'
        },
        {
            id: 2,
            name: 'User2'
        },
    ];

    res.status(200).json(find(users));
});

server.listen(8000, () => console.log('API running on port 8000'))
