const Tile = require('./tile');
const Ship = require('./ship');
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

class Grid {
  constructor(playTurn, postGame) {
    this.playTurn = playTurn;
    this.postGame = postGame;
    this.grid = this.createGrid();
    this.ships = this.createShips();
    this.placedShips = 0;
    this.sunkShips = 0;
    this.placeShip = this.placeShip.bind(this);
  }

  createGrid() {
    let grid = [];
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new Tile([i, j]));
      }
      grid.push(row);
    }
    return grid;
  }

  createShips() {
    let ships = [];
    Object.keys(SHIPS).forEach(name => {
      ships.push(new Ship(name));
    });
    return ships;
  }

  placeShip(player) {
    const ship = this.ships[this.placedShips];
    if (this.placedShips < this.ships.length) {
      const lines = process.stdout.getWindowSize()[1];
      for (let i = 0; i < lines; i++) {
          console.log('\r\n');
      }
      this.renderFull();
      this.promptStart(player, ship);
    } else {
      this.playTurn();
    }
  }

  promptStart(player, ship) {
    Reader.question(`${player.name}, where would you like to place your ${ship.name} of length ${ship.length}? (x,y) `, answer => {
      const start = answer.split(",").map(str => parseInt(str) - 1);

      if (isNaN(start[0]) || isNaN(start[1])) {
        console.log("You didn't input a proper coordinate!");
        this.promptStart(player, ship);
      } else {
        this.promptDirection(player, start);
      }
    });
  }

  promptDirection(player, start) {
    Reader.question(`${player.name}, which direction? (up, down, left, right) `, direction => {
      if (DIRECTIONS[direction]) {
        this.checkPlacement(player, start, direction);
      } else {
        console.log("You didn't input a proper direction!");
        this.promptDirection(player, start);
      }
    });
  }

  checkPlacement(player, start, direction) {
    const ship = this.ships[this.placedShips];
    const length = ship.length;
    const delta = DIRECTIONS[direction];

    for (let i = 0; i < length; i++) {
      const coords = [start[0] + (delta[0] * i), start[1] + (delta[1] * i)];
      const row = coords[0];
      const col = coords[1];

      if (row < 0 || row > 9 || col < 0 || col > 9) {
        console.log(`[${start[0] + 1},${start[1] + 1}] going ${direction} is not within the bounds!`);
        setTimeout(() => { this.placeShip(player); }, 1500);
        break;
      } else if (this.grabTile(coords).ship) {
        console.log(`A ship is in the way!`);
        setTimeout(() => { this.placeShip(player); }, 1500);
        break;
      } else if (i === length - 1) {
        this.commitPlacement(player, start, direction);
      }
    }
  }

  commitPlacement(player, start, direction) {
    const ship = this.ships[this.placedShips];
    this.placedShips += 1;
    this.commitTiles(player, ship, start, direction);
    ship.setCoords(player, start, direction, this.placeShip);
  }

  commitTiles(player, ship, start, direction) {
    const length = ship.length;
    const delta = DIRECTIONS[direction];

    for (let i = 0; i < length; i++) {
      const coords = [start[0] + (delta[0] * i), start[1] + (delta[1] * i)];
      const tile = this.grabTile(coords);
      tile.hasShip();
      tile.setShipName(ship.name);
    }
  }

  grabTile(move) {
    const row = move[0];
    const col = move[1];
    return this.grid[row][col];
  }

  checkMove(player, move, grid, getMove) {
    const row = move[0];
    const col = move[1];
    const tile = this.grabTile(move);

    if (row < 0 || row > 9 || col < 0 || col > 9) {
      console.log(`The move ${move} is not within the bounds!`);
      setTimeout(() => { player.getMove(this); }, 1500);
    } else if (tile.uncovered) {
      console.log(`You've already done the move ${move}!`);
      setTimeout(() => { player.getMove(this); }, 1500);
    } else if (tile.ship) {
      console.log("You hit the enemy!");
      this.commitSuccessfulMove(player, tile);
    } else {
      console.log("You missed the enemy!");
      this.commitUnsuccessfulMove(tile);
    }
  }

  commitSuccessfulMove(player, tile) {
    tile.uncover();
    this.alertShip(player, tile);
  }

  commitUnsuccessfulMove(tile) {
    tile.uncover();
    setTimeout(this.playTurn, 1500);
  }

  alertShip(player, tile) {
    const shipName = tile.shipName;
    const ships = this.ships;

    ships.forEach(ship => {
      if (ship.name === shipName) {
        ship.takesHit();
        if (ship.checkSunk()) {
          console.log(`You sunk the enemy's ${ship.name}!`);
          this.sunkShips += 1;
        }
      }
    });

    if (this.isOver()) {
      setTimeout(this.postGame, 1500);
    } else {
      setTimeout(() => { player.getMove(this); }, 1500);
    }
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
          return tile.ship ? "x " : "_ ";
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

  renderDivider() {
    console.log("--------------------------------");
  }

  renderFull() {
    console.log("0  1  2  3  4  5  6  7  8  9  10");
    let grid = this.grid.map((row, index) => {
      let newRow = row.map(tile => {
        if (tile.ship) {
          return tile.uncovered ? "x " : "o ";
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
