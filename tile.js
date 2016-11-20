class Tile {
  constructor(coords) {
    this.uncovered = false;
    this.ship = false;
    this.coords = coords;
  }

  uncover() {
    this.uncovered = true;
  }

  hasShip() {
    this.ship = true;
  }
}

module.exports = Tile;
