class WebSockets {
  some = ['1', '2'];

  connection(client) {
    console.log(client.rooms);
    // event fired when the chat room is disconnected
    client.on('disconnect', () => {
      // this.users = this.users.filter((user) => user.socketId !== client.id);
      console.log('disconect');
    });
    // add identity of user mapped to the socket id
    client.on('identity', (user) => {
      console.log(user.id);
      /* this.users.push({
        socketId: client.id,
        userId: userId,
      }); */
    });
    // subscribe person to chat & other user as well
    client.on('subscribe', (room, otherUserId = '') => {
      // this.subscribeOtherUser(room, otherUserId);
      // client.join(room);
      console.log('subscribe');
    });
    // mute a chat room
    client.on('unsubscribe', (room) => {
      client.leave(room);
    });

    client.on('chat_message', (message) => {
      client.emit('new_message', message);
    });

    client.on('join_room', (chatWith) => {
      console.log('jon');
    });
  }

  /* subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter(
      (user) => user.userId === otherUserId
    );
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  } */
}

module.exports = new WebSockets();
