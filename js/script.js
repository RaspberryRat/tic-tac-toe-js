const startBtn = document.getElementById('.start-btn');
const playerCountBtns = document.querySelectorAll('.player-count');
const playerOneInput = document.getElementById('player1-input');
const playerTwoInput = document.getElementById('player2-input');
const playerInputs = document.querySelectorAll('.player-input');
const errorMsg = document.getElementById('error-msg');
const xImg = document.createElement('img');
xImg.src = './images/x.png';
const oImg = document.createElement('img');
oImg.src = './images/o.png';
let playerOneName;
let playerTwoName;

playerCountBtns.forEach(btn => {
  btn.addEventListener('click', showNameInput);
});

playerInputs.forEach(box => {
  box.addEventListener('focus', () => {
    errorMsg.classList.add('hidden');
  })
});

function showNameInput(event) {
  const btn = event.target;

  if (btn.value === '1') {
    playerOneInput.classList.remove('hidden');
    playerTwoInput.classList.add('hidden');

  } else if (btn.value === '2') {
    playerOneInput.classList.remove('hidden');
    playerTwoInput.classList.remove('hidden');
  }
};

function validateForm(event) {
  const playerCount = document.querySelector('input[name="player-count"]:checked')?.value;
  const playerOneInputValue = document.getElementById('player1-name').value.trim();
  const playerTwoInputValue = document.getElementById('player2-name').value.trim();

  let validInput = false;
  let errorMsg = '';

  if (playerCount === '1' && !playerOneInputValue) {
    validInput = false;
    errorMsg = "You must enter a name for Player 1."
  } else if (playerCount === '2' && !playerOneInputValue && !playerTwoInputValue) {
    validInput = false;
    errorMsg = 'You must enter a name for Player 1 and Player 2'
  } else if (playerCount === '2' && !playerOneInputValue) {
    validInput = false;
    errorMsg = 'You must enter a name for Player 1'
  } else if (playerCount === '2' && !playerTwoInputValue) {
    validInput = false;
    errorMsg = 'You must enter a name for Player 2'
  } else {
    validInput = true;
  }

  event.preventDefault();

  if (!validInput) {
    showError(errorMsg)
  };

  if (validInput) {
    const form = document.querySelector('.form');
    form.classList.add('hidden');

    if (playerCount === '1') {
      playerOneName = playerOneInputValue;
    } else if (playerCount === '2') {
      playerOneName = playerOneInputValue;
      playerTwoName = playerTwoInputValue;
    } else {
      console.error('There was an error:', error)
    }
    return true;
  };
};

function showError(msg) {
  errorMsg.innerText = msg;
  errorMsg.classList.remove('hidden')
};

function prepareGame(event) {
  const playerCount = document.querySelector('input[name="player-count"]:checked')?.value;

  if (validateForm(event)) {
    startGame('tic tac toe', playerCount);
  } else {
    console.error('There was an error:', error);
  };
};

startBtn.addEventListener('click', prepareGame, false);



const gameboard = (function () {
  let board = [null, null, null, null, null, null, null, null, null]

  function updateBoard(location, marker) {
    min_location = 0;
    max_location = 8;

    if (location >= min_location && location <= max_location) {
      board[location] = marker;
    } else {
      console.log('An error occured:');
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

// const readline = require('node:readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async function getUserInput(question) {
//   return new Promise((resolve) => {
//     rl.question(question, (name) => {
//       resolve(name);
//     });
//   });
// };

// async function getPlayerName(ai = false) {
//   if (ai) {
//     return 'computer'
//   };

//   const message = `What is the ${playerCount < 1 ? 'first' : 'second'} player's name?:\n#`;

//   try {
//     const name = await getUserInput(message);
//     return name;
//   } catch (error) {
//     console.error('An error occurred:', error)
//   };
// };
async function startGame(gameName, numPlayers = 2) {
  console.log(`Welcome to ${gameName.toUpperCase()}`);

  //const playerOneName = await getPlayerName();
  // const playerOneName = getPlayerName();
  const playerOne = createPlayer(playerOneName);

  let playerTwo;

  if (numPlayers === 2) {
    // checks if there are two human players
    //const playerTwoName = await getPlayerName();
    // const playerTwoName = getPlayerName();
    playerTwo = createPlayer(playerTwoName);
  } else {
    // if there is only a single human player, creates an AI player

    // const playerTwoName = await getPlayerName(true);
    // const playerTwoName = getPlayerName(true);
    playerTwo = createPlayer('computer', true);
  }

  let turn = 1;
  let currentPlayer = turn % 2 === 0 ? playerTwo : playerOne;

  while (!winner(currentPlayer.marker, gameboard.board)) {
    // showBoard(displayController());
    let annouceMsg = document.getElementById('annoucement-msg');

    currentPlayer = turn % 2 === 0 ? playerTwo : playerOne;
    annouceMsg.innerText = `It is ${currentPlayer.name}'s turn.`;

    let move;

    if (currentPlayer.ai) {
      move = getComputerMove(gameboard.board);
    } else {
      //move = await getPlayerMove(currentPlayer);
      move = await getPlayerMove(currentPlayer);

    }
    gameboard.updateBoard(move, currentPlayer.marker);
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

//async
// function getPlayerMove(currentPlayer) {
//   console.log(`\n${currentPlayer.name} it is your turn.\n`);
//   const message = "What is your move? Enter the number of your chosen cell\n#";
//   // let move = await getUserInput(message);
//   let move = getUserInput(message);

//   while (!validateInput(move)) {
//     console.log(`\n${move} is an incorrect move, you must enter a number from 1-9\n`);
//     showBoard(displayController());

//     //move = await getUserInput(message);
//     move = getUserInput(message);
//   };

//   while (!validateMove(gameboard.board, move - 1)) {
//     console.log(`\n${move} is not a valid move, a piece is already at that locatin. Choose a different location.\n`)
//     showBoard(displayController());
//     // move = await getUserInput(message);
//     move = getUserInput(message);
//   };
//   return move;
// };

async function getPlayerMove(currentPlayer) {
  const move = await getPlayerChoice();
  let boardLocation = moveToArray(move);

  while (!validateMove(gameboard.board, boardLocation)) {
    let annouceMsg = document.getElementById('annoucement-msg');
    annouceMsg.innerText = 'That is an invalid move, please select a valid location.'
    let boardLocation = moveToArray(move);
  };
  displayDOM(move, currentPlayer.marker);
  return boardLocation;

};

function getPlayerChoice() {
  return new Promise((resolve) => {
    const cells = document.querySelectorAll('.cell');
    function selectCell(event) {
      const button = event.target;
      const cell = button.closest('.cell');

      const cell_location = Array.from(cell.classList);
      cells.forEach(cell => cell.removeEventListener('click', selectCell));
      resolve(cell_location)
    };
    cells.forEach(cell => {
      cell.addEventListener('click', selectCell);
    });
  });
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

function moveToArray(array) {

  array = array.filter(className => className !== 'cell');
  // TODO WOULD LIKE TO FIX THIS TO BE CLEANER


  if (array.every(i => ['row1', 'column1'].includes(i))) {
    return 0;
  } else if (array.every(i => ['row1', 'column2'].includes(i))) {
    return 1;
  } else if (array.every(i => ['row1', 'column3'].includes(i))) {
    return 2;
  } else if (array.every(i => ['row2', 'column1'].includes(i))) {
    return 3;
  } else if (array.every(i => ['row2', 'column2'].includes(i))) {
    return 4;
  } else if (array.every(i => ['row2', 'column3'].includes(i))) {
    return 5;
  } else if (array.every(i => ['row3', 'column1'].includes(i))) {
    return 6;
  } else if (array.every(i => ['row3', 'column2'].includes(i))) {
    return 7;
  } else if (array.every(i => ['row3', 'column3'].includes(i))) {
    return 8;
  } else {
    console.error('There was an error in move to array', error);
  }
};

function displayDOM(cellClasses, playerMarker) {
  const classes = '.' + cellClasses.join('.');
  console.log(classes);

  const div = document.querySelector(`div${classes}`);
  const marker = getMarker(playerMarker);
  div.innerText = marker;
};

function getMarker(marker) {
  if (marker === 'X') {
    return 'X';
  } else if (marker === 'O') {
    return 'O';
  } else {
    console.log('An error occured');
  }
}
function getComputerMove(board) {
  const availMoves = board.reduce((acc, val, index) => {
    if (val === null) acc.push(index);
    return acc
  }, []);

  const randomMove = availMoves[Math.floor(Math.random() * availMoves.length)];

  // 1 is added to adjust array to cell move
  return randomMove + 1;
};



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
// startGame('tic tac toe', 1)

