const { databaseUrl } = require('../../config');

module.exports = {
  development: {
    url: databaseUrl,
    dialect: 'postgres',
  },
  test: {
    url: databaseUrl,
    dialect: 'postgres',
  },
  production: {
    url: databaseUrl,
    dialect: 'postgres',
  },
};
