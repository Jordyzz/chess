const { uuid } = require('uuidv4');

class RoomService {
  io;
  players = [];
  roomIds = 0;

  constructor(io) {
    this.io = io;
  }

  joinRequest(socket) {
    const player = new Player(socket);
    const availablePlayer = this.players.find(player => player.isAvailable());
    if (availablePlayer) {
      const room = `room-${this.roomIds}`;
      availablePlayer.assignOpponent(player, room);
      player.socket.join(`room-${room}`);
      availablePlayer.socket.join(`room-${room}`);

      this.io.to(player.socket.id).emit('initGame', 2, room);
      this.io.to(availablePlayer.socket.id).emit('initGame', 1, room);

      this.roomIds++;
    }

    this.prepareSocket(player);
    this.players.push(player);
  }

  prepareSocket(player) {
    player.socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    player.socket.on('moveMade', (data, room) => {
      console.log('server move made');
      console.log(data, room);
      this.io.emit('gameUpdated', data);
    });
  }
}

class Player {
  id;
  socket;
  opponent;
  roomId;

  constructor(socket) {
    this.socket = socket;
  }

  isAvailable() {
    return !this.opponent;
  }

  assignOpponent(player, roomId) {
    this.opponent = player.socket;
    player.opponent = this.socket;
    this.roomId = roomId;
    player.roomId = roomId;
  }
}

module.exports = {
  RoomService
};
