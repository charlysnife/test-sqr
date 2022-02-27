const knex = require('./knex')

module.exports = async function withdrawFundByUserId(id, amount) {
    let wallet = await knex('user_wallet').where({user_id: id});
    if(amount > wallet[0].balance) {
        return {}
    }
    let new_balance = wallet[0].balance - amount
    await knex('user_wallet_withdrawal_history').insert({user_id: id, user_wallet_id: wallet[0].id, old_balance: wallet[0].balance, new_balance: new_balance, amount_requested: amount});
    return await knex('user_wallet').where({user_id: id}).update({balance: new_balance})
}