'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.Message = this.hasMany(models.Message, {
        foreignKey: 'roomId',
        as: 'messages',
        onDelete: 'CASCADE',
      });

      this.User = this.belongsToMany(models.User, {
        through: 'UserRoom',
        as: 'users',
        foreignKey: 'roomId'
      });
    }
  }
  ChatRoom.init(
    {
      title: DataTypes.STRING,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'ChatRoom',
    }
  );
  return ChatRoom;
};
