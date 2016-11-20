class Tile {
  constructor() {
    this.uncovered = false;
    this.ship = false;
  }

  uncover() {
    this.uncovered = true;
    if (this.ship) {
      return "Hit!";
    } else {
      return "Miss!";
    }
  }

  placeShip() {
    this.ship = true;
  }
}

module.exports = Tile;
