const jwt = require('jsonwebtoken');
const { accessTokenSecret } = require('../config');

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied, token missing');

  try {
    const payload = jwt.verify(token, accessTokenSecret);
    req.user = payload.user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

module.exports = auth;
