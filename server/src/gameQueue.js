const { EventEmitter } = require('events');

module.exports = class GameQueue extends EventEmitter {
  constructor(io) {
    super();
    this.q = [];
    this.io = io;

    this.gameRunning = false;
  }

  addToQueue(id) {
    const socket = this.io.sockets.sockets[id];
    if (!socket) return;
    if (socket.disconnected) return;

    this.q.push(id);
    this.emit('newPlayer');

    this.matchmaking();
  }

  matchmaking() {
    if (this.gameRunning) return;

    const players = this.getPlayers(2);
    if (!!players) {
      this.gameRunning = true;
      this.emit('gameReady', players);
    }
  }

  endGame() {
    this.gameRunning = false;
    this.emit('gameEnded');

    this.matchmaking();
  }

  removeIds(ids = []) {
    this.q = this.q.filter(id => ids.indexOf(id) === -1);
  }

  removeId(id) {
    this.removeIds([id]);
  }

  getPlayers(n) {
    const players = [];
    const invalidIds = [];

    for (let i = 0; i < this.q.length; i++) {
      const id = this.q[i];

      const socket = this.io.sockets.sockets[id];
      if (!socket || (socket && socket.disconnected)) {
        invalidIds.push(id);
        continue;
      }
      players.push(socket);

      if (players.length === n) break;
    }

    this.removeIds(invalidIds);
    if (players.length === n) {
      this.removeIds(players.map(p => p.id));
      return players;
    } else {
      return null;
    }
  }

  get length() {
    return this.q.length;
  }

  shift(n) {
    return this.q.shift(n);
  }
}
