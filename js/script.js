

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

async function getUserInput(question) {
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
  console.log(`Welcome to ${gameName.toUpperCase()}`);

  const playerOneName = await getPlayerName();
  const playerOne = createPlayer(playerOneName);

  const playerTwoName = await getPlayerName();
  const playerTwo = createPlayer(playerTwoName);


  let turn = 1;

  while (!winner()) {
    showBoard(displayController());
    let currentPlayer = turn % 2 === 0 ? playerTwo : playerOne;
    let move = await getPlayerMove(currentPlayer);
    gameboard.updateBoard(move - 1, currentPlayer.marker);

    turn++;
  }
  rl.close();


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
      boardDisplay += `_${index + 1}_`;
    };
    if ((index + 1) % 3 === 0) {
      boardDisplay += "\n";
    } else if ((index + 1) % 3 !== 0) {
      boardDisplay += "|";
    }
  });
  return boardDisplay;
};

function showBoard(board) {
  console.log(board);
};

async function getPlayerMove(currentPlayer) {
  console.log(`\n${currentPlayer.name} it is your turn.\n`);
  const message = "What is your move? Enter the number of your chosen cell\n#";
  let move = await getUserInput(message);

  while (!validateInput(move)) {
    console.log(`\n${move} is an incorrect move, you must enter a number from 1-9\n`);
    showBoard(displayController());
    move = await getUserInput(message);
  };

  while (!validateMove(gameboard.board, move - 1)) {
    console.log(`\n${move} is not a valid move, a piece is already at that locatin. Choose a different location.\n`)
    showBoard(displayController());
    move = await getUserInput(message);
  };
  return move;
};

function validateInput(playerInput) {
  const min_num = 1;
  const max_num = 9;

  if (!typeof playerInput === 'number') {
    return false
  } else if (playerInput >= min_num && playerInput <= max_num) {
    return true
  } else {
    return false
  };
};

function validateMove(board, location) {
  if (board[location] === null) {
    return true;
  } else {
    return false;
  };
}

function winner() {
  return false;
};

startGame('tic tac toe');
