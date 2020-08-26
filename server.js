const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { RoomService } = require('./server/RoomService');

const roomService = new RoomService(io);

const port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', function(socket) {
  roomService.joinRequest(socket);
  console.log('user joined');
});

http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
