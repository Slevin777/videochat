'use strict';
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const { accessTokenSecret, refreshTokenSecret } = require('../../config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async createAccessToken() {
      let { id, name, email } = this;
      let accessToken = jwt.sign(
        { user: { id, name, email } },
        accessTokenSecret,
        {
          expiresIn: '10m',
        }
      );
      return accessToken;
    }

    async createRefreshToken() {
      let { id, name, email } = this;
      let refreshToken = jwt.sign(
        { user: { id, name, email } },
        refreshTokenSecret,
        {
          expiresIn: '1d',
        }
      );
      return refreshToken;
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      nickName: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
