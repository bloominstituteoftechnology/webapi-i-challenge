const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);


// -- EXPORTS -- //
module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

// -- METHODS -- //
// -1- //
  function find() {
    return db('users');
  }
// -2- //
  function findById(id) {
    return db('users')
      .where({ id: Number(id) })
      .first();
  }
// -3- //
  function insert(user) {
    return db('users')
      .insert(user)
      .then(ids => ({ id: ids[0] }));
  }
// -4- //
  function update(id, user) {
    return db('users')
      .where('id', Number(id))
      .update(user);
  }
// -5- //
  function remove(id) {
    return db('users')
      .where('id', Number(id))
      .del();
  }
