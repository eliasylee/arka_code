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

  setShipName(shipName) {
    this.shipName = shipName;
  }
}

module.exports = Tile;
