

// gameboard will be an array


const gameboard = (function () {
  let board = [null, null, null, null, null, null, null, null, null]

  function updateBoard(location, marker) {
    min_location = 0;
    max_location = 8;

    if (location >= min_location && location <= max_location) {
      board[location] = marker;
    } else {
      console.error('An error occured:', error);
    }
  }
  return { board, updateBoard };

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

  // const playerOneName = await getPlayerName();
  // const playerOne = createPlayer(playerOneName);

  // const playerTwoName = await getPlayerName();
  // const playerTwo = createPlayer(playerTwoName);
  rl.close();

  // console.log(`The name from startGame is ${gameName}`)
  // console.log(playerOne, playerTwo)

  console.log(displayController());
  gameboard.updateBoard(0, 'X');
  console.log(displayController());
  gameboard.updateBoard(0, 'X');
  console.log(displayController());

  gameboard.updateBoard(8, 'O');
  console.log(displayController());

  gameboard.updateBoard(5, 'X');
  console.log(displayController());


};

function displayController() {
  //use gameboard to display
  const boardState = gameboard.board;
  let boardDisplay = '\n';

  boardState.forEach((cell, index) => {
    if (cell === 'O') {
      boardDisplay += "_O_";
    } else if (cell === 'X') {
      boardDisplay += "_X_";
    } else {
      boardDisplay += "___";
    };
    if ((index + 1) % 3 === 0) {
      boardDisplay += "\n";
    } else if ((index + 1) % 3 !== 0) {
      boardDisplay += "|";
    }
  });
  return boardDisplay;
};

startGame('tictactoe');
