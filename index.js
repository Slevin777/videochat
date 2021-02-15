const express = require('express');
const server = require('./server');
const io = require('socket.io')(server);
const WebSockets = require('./utils/WebSockets');
const { User, ChatRoom, Message } = require('./database/models');
const RoomController = require('./controllers/RoomController');
const UserController = require('./controllers/UserController');
const message = require('./database/models/message');
const MessageController = require('./controllers/MessageController');

// const db = require('./database/models')
// db.sequelize.sync({ force: true })

//server
// const server = https
//   .createServer(
//     {
//       key: fs.readFileSync('./https/server.key'),
//       cert: fs.readFileSync('./https/server.cert'),
//     },
//     app
//   )

// global.io.on('connection', WebSockets.connection);

/* Message.create({
  userId: 1,
  roomId: 1,
  message: 'Hello lol'
}) */

/* const getRoom = async (id) => {
  const room = await ChatRoom.findByPk(id, { include: ['messages'] })
  console.log(room.messages)
}
getRoom(1) */

/* const addNewRoom = async (userId, roomId) => {
  const user = await User.findByPk(userId)
  const room = await ChatRoom.findByPk(roomId)

  user.addRoom(room)
  console.log('done')
}
addNewRoom(2, 4) */

// RoomController.createRoom(3, 2)


/* const findAll = async () => {
  const users = await User.findAll({
    include: [
      {
        model: ChatRoom,
        as: 'rooms',
        attributes: ['id', 'title', 'type'],
        through: {
          attributes: []
        }
      }
    ]
  })
  console.log(users[0].rooms)
}

findAll() */


let userOnline = [];

io.on('connection', async (client) => {
  console.log('text connected')

  const allUsers = await UserController.getAllUsers()
  client.emit('all_users', allUsers)

  client.on('join_room', async (users) => {

    const ininiator = await UserController.getUserById(users.from)
    const interlocutor = await UserController.getUserById(users.to)

    const initiatorRooms = ininiator.rooms.map(room => room.id)
    const interlocutorRooms = interlocutor.rooms.map(room => room.id)

    let roomId = initiatorRooms.filter(room => interlocutorRooms.includes(room))[0]
    if (!roomId) {
      const room = await RoomController.createRoom('new', 1)
      roomId = room.id
      ininiator.addRoom(room)
      interlocutor.addRoom(room)
    }

    client.join(roomId, async () => {
      const room = await RoomController.getRoom(roomId)
      client.emit('room_joined', room)
    })
  });

  client.on('new_message', async (data) => {
    const message = await MessageController.createMessage(data.message.message, data.roomId, data.userId)

    io
      .to(data.roomId)
      .emit('got_message', message)
  })

  client.on('disconnect', () => {
    userOnline = userOnline.filter((user) => user.socketId !== client.id);
  });


  //Video
  client.on('call-user', data => {
    client
      .to(data.to)
      .emit('call-made', {
        offer: data.offer
      })
  })

  client.on('make-answer', data => {
    client
      .to(data.to)
      .emit('answer-made', {
        answer: data.answer
      })
  })

  client.on('ice-candidate', data => {
    client.to(data.to).emit('ice-candidate', data.candidate)
  })

});


//video socket setup
/* let activeSockets = [];
io.of('/video').on('connection', (socket) => {
  console.log('vidoe connected');
  const existingSocket = activeSockets.find(
    (existingSocket) => existingSocket === socket.id
  );

  if (!existingSocket) {
    activeSockets.push(socket.id);

    socket.emit('update-user-list', {
      users: activeSockets.filter(
        (existingSocket) => existingSocket !== socket.id
      ),
    });

    socket.broadcast.emit('update-user-list', {
      users: [socket.id],
    });
  }

  socket.on('call-user', (data) => {
    socket.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: socket.id,
    });
  });

  socket.on('make-answer', (data) => {
    socket.to(data.to).emit('answer-made', {
      socket: socket.id,
      answer: data.answer,
    });
  });

  socket.on('disconnect', () => {
    activeSockets = activeSockets.filter(
      (existingSocket) => existingSocket !== socket.id
    );
    socket.broadcast.emit('remove-user', {
      socketId: socket.id,
    });
  });
}); */
