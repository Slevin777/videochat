const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  databaseUrlDev: process.env.DATABASE_URL_DEV,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
};
