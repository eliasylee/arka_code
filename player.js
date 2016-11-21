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
      if (isNaN(move[0]) || isNaN(move[1])) {
        console.log("You didn't input a proper coordinate!");
        setTimeout(() => { this.getMove(grid); }, 1500);
      } else {
        grid.checkMove(this, move, grid, this.getMove);
      }
    });
  }
}

module.exports = Player;
