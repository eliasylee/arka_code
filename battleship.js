const Game = require('./game');
const Reader = require('./reader');

const complete = () => {
  Reader.question("Would you like to play again? (Y/N) ", answer => {
    if (answer.toLowerCase() === "y") {
      new Game().run(complete);
    } else {
      console.log("Thanks for playing!");
      Reader.close();
    }
  });
};

new Game().run(complete);
