const Player = require('./player');
const Grid = require('./grid');

class Game {
  constructor() {
    this.turn = -1;
    this.players = [new Player("Player 1"), new Player("Player 2")];
    this.grids = [new Grid(), new Grid()];
  }

  run(complete) {
    this.complete = complete;
    this.playTurn();
  }

  preGame() {
    console.log(`Welcome to Battleship, ${this.currentPlayer().name}!`);
    this.currentGrid().promptStart(this.currentPlayer());
  }

  postGame() {
    console.log(`Congratulations, ${this.currentPlayer().name}! You are the winner!`);
    this.complete();
  }

  playTurn() {
    this.turn += 1;
    this.renderGrids();

    if (this.turn < 2) {
      this.preGame();
    } else if (this.isOver()) {
      this.postGame();
    } else {
      let move = this.currentPlayer().getMove(this.currentGrid);
    }
  }

  currentPlayer() {
    return this.players[this.turn % 2];
  }

  currentGrid() {
    return this.grids[this.turn % 2];
  }

  nonCurrentGrid() {
    return this.grids[(this.turn + 1) % 2];
  }

  renderGrids() {
    this.currentGrid().renderFull();
    this.nonCurrentGrid().renderHidden();
  }

  isOver() {
    return this.grids[0].isOver() || this.grids[0].isOver();
  }
}

module.exports = Game;
