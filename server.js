// import { Server } from 'socket.io';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDatabase } from './config/database.js';
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

connectDatabase()
  .then(() => {
    console.log('DB Connected!');
  })
  .catch((error) => console.log(error.message));

// io.on('connection', (socket) => {
//   console.log('New user connected');

//   // Send a notification to the client
//   // socket.emit('notification', 'You are now connected!');

//   // Listen for a custom event from the client
//   // socket.on('customEvent', (data) => {
//   //   console.log('Received custom event:', data);
//   // });

//   // Listen for a disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// const server = app.listen(PORT, () => console.log(`Server Started on the Port: ${PORT}`));

// const io = require('socket.io')(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: '*',
//   },
// });

// const httpServer = createServer(server);
// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('connected to socket.io');
// });

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('Connected');

  // take user id and socket id
  socket.on('addUser', ({ userId }) => {
    addUser(userId, socket.id);
    console.log(userId);

    io.emit('getUsers', users);
  });

  // send and get message from client
  socket.on('sendNotification', ({ senderId, receiverId, type }) => {
    const receiver = getUser(receiverId);

    io.to(receiver.socketId).emit('getNotification', {
      senderId,
      type,
    });
  });

  // send notification to all
  socket.on('sendNotificationToAll', ({ senderId, receiverId, type }) => {
    const receiver = getUser(receiverId);

    io.to(receiver.socketId).emit('getNotification', {
      senderId,
      type,
    });
  });

  getApiAndEmit(socket);
  socket.on('disconnect', () => {
    console.log('Disconnected');

    removeUser(socket.id);
  });
});

const getApiAndEmit = (socket) => {
  const response = 'response you need54';
  socket.emit('FromAPI', response);

  socket.on('sendNotification', () => {
    io.to(socket.id);
  });
};

app.set('port', process.env.PORT || 5000);

httpServer.listen(app.get('port'), function () {
  const port = httpServer.address().port;
  console.log('Running on : ', port);
});
