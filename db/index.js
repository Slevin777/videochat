const { Client, Pool } = require('pg');

const connectionString = 'postgresql://me:password@localhost:5432/api';

const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params) => pool.query(text, params),
};
