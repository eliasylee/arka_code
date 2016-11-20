const Reader = require('./reader');

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

  name() {
    return this.name;
  }

  promptStart(player) {
    let start;

    Reader.question(`${player.name}, where would you like to place your ${this.name} of length ${SHIPS[this.name]}? (x,y) `, answer => {
      start = answer.split(",");

      if (start) {
        return start;
      }
    });
  }

  promptDirection(player) {
    let direction;

    Reader.question(`${player.name}, which direction? (up, down, left, right) `, answer => {
      direction = answer;

      if (direction) {
        return direction;
      }
    });
  }

  setCoords(start, direction) {
    for (let i = 0; i < this.length; i++) {
      const delta = DIRECTIONS[direction];
      const row = start[0] + (delta[0] * i);
      const col = start[1] + (delta[1] * i);
      this.coords.push([row, col]);
    }
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
