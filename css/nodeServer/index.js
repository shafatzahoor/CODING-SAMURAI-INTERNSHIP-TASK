const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');

// App setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"]
  }
});


app.use(cors());


// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Users object to keep track
const users = {};

// Socket.IO events
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    });
});

// Server listening on port 8000
server.listen(8000, () => {
    console.log('Server running at http://localhost:8000');
});
