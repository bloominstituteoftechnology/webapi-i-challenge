exports.seed = function(knex, Promise) {
  return knex('users')
    .truncate()
    .then(function() {
      return knex('users').insert([
        {
          name: 'AtokiBot',
          bio: 'CS8 Student at Lambda School',
        },
        {
          name: 'GeekBot',
          bio: 'CS8 Student at Lambda School',
        },
      ]);
    });
};
