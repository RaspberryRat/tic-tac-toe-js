

// gameboard will be an array


const gameboard = (function () {
  const board = [null, null, null, null, null, null, null, null, null]

  return { board }

})();

let playerCount = 0

function createPlayer(name) {
  if (playerCount === 0) {
    var marker = 'X'
  } else {
    var marker = 'O'
  };
  playerCount++
  return { name, marker };
};

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getUserInput(question) {
  return new Promise((resolve) => {
    rl.question(question, (name) => {
      resolve(name);
    });
  });
};

async function getPlayerName() {
  const message = `What is the ${playerCount < 1 ? 'first' : 'second'} player's name?:\n#`

  try {
    const name = await getUserInput(message);
    return name;
  } catch (error) {
    console.error('An error occurred:', error)
  };
};

async function startGame(gameName) {
  console.log('Welcome to TIC TAC TOE');

  const playerOneName = await getPlayerName();
  const playerOne = createPlayer(playerOneName);

  const playerTwoName = await getPlayerName();
  const playerTwo = createPlayer(playerTwoName);
  rl.close();

  console.log(`The name from startGame is ${gameName}`)
  console.log(playerOne, playerTwo)
};

startGame('tictactoe');
