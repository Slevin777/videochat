const { Message } = require('../database/models')

const createMessage = async (message, roomId, userId) => {
  return await Message.create({
    message, roomId, userId
  })
}

module.exports = {
  createMessage
}