const Reader = require('./reader');

class Player {
  constructor(name) {
    this.name = name;
  }

  getMove(currentGrid) {
    Reader.question(`${this.name}, what is your move? ('x,y')`, answer => {
      if (currentGrid.validMove(answer)) {
        currentGrid.placeMove(answer);
      } else {
        this.getMove(currentGrid);
      }
    });
  }
}

module.exports = Player;
