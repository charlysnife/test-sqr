const knex = require('./knex')

module.exports = async function transferFundByUserId(user_id, receiver_id, amount) {
    let wallet = await knex('user_wallet').where({user_id: user_id});
    let receiver_wallet = await knex('user_wallet').where({user_id: receiver_id});
    if(amount > wallet[0].balance) {
        return {}
    }
    let new_balance = wallet[0].balance - amount
    let new_receiver_balance = receiver_wallet[0].balance + amount
    await knex('user_wallet_transfer_history').insert({user_id: user_id, sender_wallet_id: wallet[0].id, receiver_wallet_id: receiver_wallet[0].id, sender_old_balance: wallet[0].balance, receiver_old_balance: receiver_wallet[0].balance, sender_new_balance: new_balance, receiver_new_balance: new_receiver_balance, amount_transfered: amount, amount_received: amount});
    await knex('user_wallet').where({user_id: receiver_id}).update({balance: new_receiver_balance})
    return await knex('user_wallet').where({user_id: user_id}).update({balance: new_balance})
}