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

    let accessToken = await user.createAccessToken();

    res.status(201).send(accessToken);
  } catch (error) {
    console.log(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: ['rooms'],
      order: [['name', 'ASC']],
      attributes: {
        exclude: ['password']
      },
    })

    return allUsers
  } catch (error) {
    console.log(error.message);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, { include: 'rooms' });

    return user
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
};
