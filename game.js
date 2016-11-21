const Player = require('./player');
const Grid = require('./grid');

class Game {
  constructor() {
    this.turn = -1;
    this.playTurn = this.playTurn.bind(this);
    this.postGame = this.postGame.bind(this);
    this.renderGrids = this.renderGrids.bind(this);
    this.players = [new Player("Player 1", this.renderGrids),
                    new Player("Player 2", this.renderGrids)];
    this.grids = [new Grid(this.playTurn, this.postGame),
                  new Grid(this.playTurn, this.postGame)];
  }

  run(complete) {
    this.complete = complete;
    this.playTurn();
  }

  preGame() {
    console.log(`Welcome to Battleship, ${this.currentPlayer().name}!`);
    const grid = this.currentGrid();
    grid.placeShip(this.currentPlayer());
  }

  postGame() {
    this.renderGrids();
    console.log(`Congratulations, ${this.currentPlayer().name}! You are the winner!`);
    this.complete();
  }

  playTurn() {
    this.turn += 1;
    if (this.turn < 2) {
      this.preGame();
    } else {
      let move = this.currentPlayer().getMove(this.nonCurrentGrid(), this.renderGrids);
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
    this.nonCurrentGrid().renderHidden();
    this.currentGrid().renderFull();
  }
}

module.exports = Game;
