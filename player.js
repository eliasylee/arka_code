const Reader = require('./reader');

class Player {
  constructor(name, renderGrids) {
    this.name = name;
    this.getMove = this.getMove.bind(this);
    this.renderGrids = renderGrids;
  }

  getMove(grid) {
    this.renderGrids();
    Reader.question(`${this.name}, what is your move? (x,y) `, answer => {
      const move = answer.split(",").map(str => parseInt(str) - 1);
      if (answer) {
        grid.checkMove(this, move, grid, this.getMove);
      } else {
        this.getMove(grid);
      }
    });
  }
}

module.exports = Player;
