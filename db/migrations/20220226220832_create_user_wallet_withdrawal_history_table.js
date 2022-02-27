/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_wallet_withdrawal_history', function (table) {
      table.increments('id');
      table.integer('user_id').notNullable();
      table.integer('user_wallet_id').notNullable();
      table.integer('old_balance', 11).defaultTo(0);
      table.integer('new_balance', 11).defaultTo(0);
      table.integer('amount_requested', 11).defaultTo(0);
      table.datetime('transaction_date').defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('user_wallet_withdrawal_history');
};
