const Game = require('./game');
const Reader = require('./reader');

const complete = () => {
  Reader.question("Would you like to play again?", answer => {
    if (answer.toLowerCase() === "y") {
      new Game().run(complete);
    } else {
      Reader.close();
    }
  });
};

new Game().run(complete);
