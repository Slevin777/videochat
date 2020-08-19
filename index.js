const express = require('express');
const socket = require('socket.io');
const https = require('https');
const fs = require('fs');
const db = require('./db');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.get('/us', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users');
    console.log(rows);
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
  }
});

//server
// const server = https
//   .createServer(
//     {
//       key: fs.readFileSync('./https/server.key'),
//       cert: fs.readFileSync('./https/server.cert'),
//     },
//     app
//   )
const server = app.listen(9001, () => console.log('Listening on port 9001'));

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
