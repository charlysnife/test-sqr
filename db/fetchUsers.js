const knex = require('./knex')

module.exports = async function fetchUsers() {
    return await knex.select().from('users')
}