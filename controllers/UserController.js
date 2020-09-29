const { User } = require('../database/models');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) return res.status(400).send('User already registered');

    user = await User.build(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(201).send(user);
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
