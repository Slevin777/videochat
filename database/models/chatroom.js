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

      this.messageAssociation = this.hasMany(models.Message, {
        foreignKey: 'roomId',
        as: 'messages',
        onDelete: 'CASCADE',
      });

      this.userAssociation = this.belongsToMany(models.User, {
        through: 'UserRoom',
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
