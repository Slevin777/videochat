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

      this.Message = this.hasMany(models.Message, {
        foreignKey: 'userId',
        as: 'messages',
        onDelete: 'CASCADE',
      });

      // this.roomAssociation = this.hasMany(models.ChatRoom);
      this.ChatRoom = this.belongsToMany(models.ChatRoom, {
        through: 'UserRoom',
        as: 'rooms',
        foreignKey: 'userId'
      });
    }

    async createAccessToken() {
      const { id, name, email } = this;
      const accessToken = jwt.sign(
        { id, name, email },
        accessTokenSecret
        /* {
          expiresIn: '10m',
        } */
      );
      return accessToken;
    }

    async createRefreshToken() {
      const { id, name, email } = this;
      const refreshToken = jwt.sign({ id, name, email }, refreshTokenSecret, {
        expiresIn: '1d',
      });
      return refreshToken;
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      // nickName: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  // sequelize.sync({ force: true });

  return User;
};
