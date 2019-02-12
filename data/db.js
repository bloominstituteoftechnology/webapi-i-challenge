const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id: Number(id) })
    .first();
}

function insert(user) {
  return db("users")
    .insert(user)
    .then(ids => ({ id: ids[0] }));
}

function update(id, user) {
  if (user.name && user.bio) {
    return db("users")
      .where("id", Number(id))
      .update(user);
  } else {
    return Promise.reject({
      code: 400,
      message: "Please provide name abd bio for the user."
    });
  }
}

function remove(id) {
  return db("users")
    .where("id", Number(id))
    .del();
}
