const SHIPS = {
  'Destroyer': 2,
  'Submarine': 3,
  'Cruiser': 3,
  'Battleship': 4,
  'Carrier': 5
};

const DIRECTIONS = {
  'up': [-1, 0],
  'down': [1, 0],
  'left': [0, -1],
  'right': [0, 1]
};

class Ship {
  constructor(name) {
    this.name = name;
    this.length = SHIPS[name];
    this.coords = [];
    this.hits = 0;
  }

  setCoords(player, start, direction, playTurn) {
    for (let i = 0; i < this.length; i++) {
      const delta = DIRECTIONS[direction];
      const row = start[0] + (delta[0] * i);
      const col = start[1] + (delta[1] * i);
      this.coords.push([row, col]);
    }
    playTurn(player);
  }

  takesHit() {
    this.hits += 1;
  }

  checkSunk() {
    if (this.length === this.hits) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Ship;
