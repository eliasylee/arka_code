const Tile = require('./tile');
const Ship = require('./ship');

const SHIP_NAMES = [
  'Destroyer',
  'Submarine',
  'Cruiser',
  'Battleship',
  'Carrier'
];

const DIRECTIONS = {
  'up': [-1, 0],
  'down': [1, 0],
  'left': [0, -1],
  'right': [0, 1]
};

class Grid {
  constructor() {
    this.grid = this.createGrid();
    this.ships = this.createShips();
    this.placedShips = 0;
    this.sunkShips = 0;
  }

  createGrid() {
    let grid = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new Tile());
      }
      grid.push(row);
    }
    return grid;
  }

  createShips() {
    let ships = [];
    SHIP_NAMES.forEach(name => {
      ships.push(new Ship(name));
    });
    return ships;
  }

  placeShip(player) {
    if (this.placedShips < this.ships.length) {
      const ship = this.ships[this.placedShips];
      const start = ship.promptStart(player);
      const direction = ship.promptDirection(player);

      ship.setCoords(start, direction);
      this.placedShips += 1;
      this.placeShip();
    }
  }

  playMove(move) {
    const tile = this.grabTile(move);
  }

  grabTile(move) {
    const coords = move.split(",");
    const row = coords[0];
    const col = coords[1];
    return this.grid[row][col];
  }

  isOver() {
    if (this.sunkShips < 5) {
      return false;
    } else {
      return true;
    }
  }

  renderHidden() {
    console.log("0  1  2  3  4  5  6  7  8  9  10");
    let grid = this.grid.map((row, index) => {
      let newRow = row.map(tile => {
        if (tile.uncovered) {
          return tile.ship ? "x" : "_";
        } else {
          return "[]";
        }
      });

      if (index > 8) {
        console.log((index + 1) + " " + newRow.join(" "));
      } else {
        console.log((index + 1) + "  " + newRow.join(" "));
      }
    });
  }

  renderFull() {
    console.log("0  1  2  3  4  5  6  7  8  9  10");
    let grid = this.grid.map((row, index) => {
      let newRow = row.map(tile => {
        if (tile.ship) {
          return tile.uncovered ? "x" : "o";
        } else {
          return "[]";
        }
      });

      if (index > 8) {
        console.log((index + 1) + " " + newRow.join(" "));
      } else {
        console.log((index + 1) + "  " + newRow.join(" "));
      }
    });
  }
}

module.exports = Grid;
