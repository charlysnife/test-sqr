const knex = require('./knex')

module.exports = async function fetchUsers(email) {
    return await knex('users').where({email: email});
}