const { User } = require('../database/models');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
  let user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  let accessToken = await user.createAccessToken();
  let refreshToken = await user.createRefreshToken();

  res.status(201).send({ accessToken, refreshToken });
};

module.exports = {
  login,
};
