'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.User = this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
      });

      this.ChatRoom = this.belongsTo(models.ChatRoom, {
        foreignKey: 'roomId',
        as: 'room',
      });
    }
  }
  Message.init(
    {
      roomId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
