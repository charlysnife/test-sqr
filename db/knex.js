const dotenv = require('dotenv');
dotenv.config()

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js');
const knex = require('knex');

module.exports = knex(config[environment])