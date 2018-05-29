const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

/**
 * return: promise
 */
function find() {
  return db('users');
}

/**
 * return: Object
 */
function findById(id) {
  return db('users').where({ id: Number(id) });
}

/**
 * return: Object => { "id": 123 }
 */
function insert(user) {
  return db('users')
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

/**
 * return: number
 * 1: Success
 */
function update(id, user) {
  return db('users')
    .where('id', Number(id))
    .update(user);
}

/**
 * return: number of records deleted
 */
function remove(id) {
  return db('users')
    .where('id', Number(id))
    .del();
}
 