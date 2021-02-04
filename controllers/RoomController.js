const { ChatRoom } = require('../database/models')

const createRoom = async (title, type) => {
  const room = await ChatRoom.create({
    title,
    type
  })

  return room
}

const getRoom = async (roomId) => {
  const room = await ChatRoom.findByPk(roomId, { include: ['messages'] })
  if (!room) return

  return room
}

module.exports = {
  createRoom,
  getRoom
}