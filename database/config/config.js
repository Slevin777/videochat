const { databaseUrl, databaseUrlDev } = require('../../config');

module.exports = {
  development: {
    url: databaseUrlDev,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  },
  test: {
    url: databaseUrl,
    dialect: 'postgres',
  },
  production: {
    url: databaseUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        required: true,
        rejectUnauthorized: false
      }
    }
  },
};
