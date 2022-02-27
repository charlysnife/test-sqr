/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_wallet_transfer_history', function (table) {
      table.increments('id');
      table.integer('user_id').notNullable();
      table.integer('sender_wallet_id').notNullable();
      table.integer('receiver_wallet_id').notNullable();
      table.integer('sender_old_balance', 11).defaultTo(0);
      table.integer('sender_new_balance', 11).defaultTo(0);
      table.integer('receiver_old_balance', 11).defaultTo(0);
      table.integer('receiver_new_balance', 11).defaultTo(0);
      table.integer('amount_transfered', 11).defaultTo(0);
      table.integer('amount_received', 11).defaultTo(0);
      table.datetime('transaction_date').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user_wallet_transfer_history');
};
