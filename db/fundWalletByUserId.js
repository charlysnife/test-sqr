const knex = require('./knex')

module.exports = async function fundWalletByUserId(id, amount) {
    let wallet = await knex('user_wallet').where({user_id: id});
    let new_balance = wallet[0].balance + amount
    await knex('user_wallet_fund_history').insert({user_id: id, user_wallet_id: wallet[0].id, old_balance: wallet[0].balance, new_balance: new_balance, amount_funded: amount});
    return await knex('user_wallet').where({user_id: id}).update({balance: new_balance})
}