const knex = require('./knex');
const bcrypt = require('bcryptjs')

module.exports = async function insertUser(data) {
    let check = await knex('users').where({email: data.email}).select('id');
    if(!check.length) {
        let hash = bcrypt.hashSync(data.password.trim(), bcrypt.genSaltSync(10));

        let user = await knex('users').insert({first_name: data.firstname, last_name: data.lastname, email: data.email, password: hash.trim()});
        await knex('user_wallet').insert({balance: 0, user_id: user[0]});
        return user;
    } else {
        return {}
    }
}