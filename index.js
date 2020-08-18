const express = require('express');
const socket = require('socket.io');
const https = require('https');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

const server = https
  .createServer(
    {
      key: fs.readFileSync('./https/server.key'),
      cert: fs.readFileSync('./https/server.cert'),
    },
    app
  )
  .listen(9001, () => console.log('Listening on port 9001'));

//socket setup
let activeSockets = [];
const io = socket(server);

io.on('connection', (socket) => {
  console.log('socket connected');
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
});
