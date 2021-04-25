require('dotenv').config();

module.exports = {
  username: process.env.db_username || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'crudcar',
  host: process.env.DB_HOST || '127.0.0.1',
  logging: false,
  dialect: 'postgres',
}
