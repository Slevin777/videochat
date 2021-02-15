// const { Pool } = require('pg');
/* const { databaseUrl } = require('../config');
const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize(databaseUrl);

//Models
const User = db.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  nickName: { type: DataTypes.STRING, allowNull: true },
}); */

/* const pool = new Pool({ connectionString: databaseUrl });

pool.on('connect', () => console.log('connected tod db'));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
 */
