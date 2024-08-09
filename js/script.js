

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

function createPlayer(name, ai = false) {
  if (playerCount === 0) {
    var marker = 'X'
  } else {
    var marker = 'O'
  };
  playerCount++
  return { name, marker, ai };
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

async function getPlayerName(ai = false) {
  if (ai) {
    return 'computer'
  };

  const message = `What is the ${playerCount < 1 ? 'first' : 'second'} player's name?:\n#`;

  try {
    const name = await getUserInput(message);
    return name;
  } catch (error) {
    console.error('An error occurred:', error)
  };
};

async function startGame(gameName, numPlayers = 2) {
  console.log(`Welcome to ${gameName.toUpperCase()}`);

  const playerOneName = await getPlayerName();
  const playerOne = createPlayer(playerOneName);

  let playerTwo;

  if (numPlayers === 2) {
    // checks if there are two human players
    const playerTwoName = await getPlayerName();
    playerTwo = createPlayer(playerTwoName);
  } else {
    // if there is only a single human player, creates an AI player
    const playerTwoName = await getPlayerName(true);
    playerTwo = createPlayer(playerTwoName, true);
  }

  let turn = 1;
  let currentPlayer = turn % 2 === 0 ? playerTwo : playerOne;

  while (!winner(currentPlayer.marker, gameboard.board)) {
    showBoard(displayController());

    currentPlayer = turn % 2 === 0 ? playerTwo : playerOne;
    let move;

    if (currentPlayer.ai) {
      move = getComputerMove(gameboard.board);
    } else {
      move = await getPlayerMove(currentPlayer);
    }
    gameboard.updateBoard(move - 1, currentPlayer.marker);

    turn++;
  }
  rl.close();

  showBoard(displayController());
  console.log(`${currentPlayer.name} is the WINNER!`);
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
};

function getComputerMove(board) {
  const availMoves = board.reduce((acc, val, index) => {
    if (val === null) acc.push(index);
    return acc
  }, []);

  const randomMove = availMoves[Math.floor(Math.random() * availMoves.length)];

  // 1 is added to adjust array to cell move
  return randomMove + 1;
}


function winner(marker, board) {
  const win_condtions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  // create a loop that goes through game board and checks each location, if marker is at each location in a set of winners, winner declared
  let marker_locations = []
  for (let i = 0; i < board.length; i++) {
    if (board[i] === marker) {
      marker_locations.push(i);
    };
  };

  for (let i = 0; i < win_condtions.length; i++) {
    if (win_condtions[i].every(cell => marker_locations.includes(cell))) {
      return true;
    };
  };
  return false;
};

// startGame('tic tac toe');

// start with AI
startGame('tic tac toe', 1)

