const startBtn = document.getElementById('.start-btn');
const playerCountBtns = document.querySelectorAll('.player-count');
const playerOneInput = document.getElementById('player1-input');
const playerTwoInput = document.getElementById('player2-input');
const playerInputs = document.querySelectorAll('.player-input');
const errorMsg = document.getElementById('error-msg');
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
  showAnnouce();
  const playerCount = document.querySelector('input[name="player-count"]:checked')?.value;

  if (validateForm(event)) {
    console.log('Starting...')
    startGame('tic tac toe', playerCount);
  } else {
    console.error('There was an error:', error);
  };
};

startBtn.addEventListener('click', prepareGame, false);

function showAnnouce() {
  const annouceMsg = document.getElementById('annoucement-msg');
  annouceMsg.classList.remove('hidden');
}


const gameboard = (function () {
  let board = [null, null, null, null, null, null, null, null, null]

  function updateBoard(location, marker) {
    const minLocation = 0;
    const maxLocation = 8;

    if (location >= minLocation && location <= maxLocation) {
      board[location] = marker;
    } else {
      console.log('An error occured:');
    }
  }
  return { board, updateBoard };

})();

let totalPlayers = 0

function createPlayer(name, ai = false) {
  if (totalPlayers === 0) {
    var marker = 'X'
  } else {
    var marker = 'O'
  };
  totalPlayers++
  return { name, marker, ai };
};

async function startGame(gameName, numPlayers = 2) {
  console.log(`Welcome to ${gameName.toUpperCase()}`);

  const playerOne = createPlayer(playerOneName);
  let playerTwo;

  if (numPlayers === 2 || numPlayers === '2') {
    playerTwo = createPlayer(playerTwoName, false);
  } else {
    playerTwo = createPlayer('computer', true);
  };

  let turn = 1;
  let currentPlayer = turn % 2 === 0 ? playerTwo : playerOne;

  while (!winner(currentPlayer, gameboard.board)) {
    showBoard(displayController());
    let annouceMsg = document.getElementById('annoucement-msg');

    currentPlayer = turn % 2 === 0 ? playerTwo : playerOne;
    annouceMsg.innerText = `It is ${currentPlayer.name}'s turn.`;

    let move;

    if (currentPlayer.ai) {
      move = await getComputerMove(gameboard.board);
    } else {
      move = await getPlayerMove(currentPlayer);

    }
    gameboard.updateBoard(move, currentPlayer.marker);
    turn++;
    if (checkTieGame(gameboard.board)) {
      announceTie();
      break;
    };
  };

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
  const div = document.querySelector(`div${classes}`);
  const marker = getMarker(playerMarker);
  div.appendChild(marker);
};

const xImg = document.createElement('img');
const oImg = document.createElement('img');
oImg.src = './images/o.png';

function getMarker(marker) {
  if (marker === 'X') {
    const xImg = document.createElement('img');
    xImg.src = './images/x.png';
    return xImg;
  } else if (marker === 'O') {
    const oImg = document.createElement('img');
    oImg.src = './images/o.png';
    return oImg;
  } else {
    console.log('An error occured');
  }
};

async function getComputerMove(board) {
  const availMoves = board.reduce((acc, val, index) => {
    if (val === null) acc.push(index);
    return acc
  }, []);

  const randomMove = availMoves[Math.floor(Math.random() * availMoves.length)];
  const cellClasses = moveToDOM(randomMove);
  await computerThoughts();
  displayDOM(cellClasses, 'O');
  return randomMove;
};

async function computerThoughts() {
  const annouceMsg = document.getElementById('annoucement-msg');
  annouceMsg.innerText = '';
  annouceMsg.innerText = 'Computer is Thinking';
  for (let i = 0; i < 3; i++) {
    await new Promise(r => setTimeout(r, 500));
    annouceMsg.innerText += '  .';
  };
};

function moveToDOM(arrayLocation) {

  switch (arrayLocation) {
    case 0:
      return ['row1', 'column1', 'cell'];
    case 1:
      return ['row1', 'column2', 'cell'];
    case 2:
      return ['row1', 'column3', 'cell'];
    case 3:
      return ['row2', 'column1', 'cell'];
    case 4:
      return ['row2', 'column2', 'cell'];
    case 5:
      return ['row2', 'column3', 'cell'];
    case 6:
      return ['row3', 'column1', 'cell'];
    case 7:
      return ['row3', 'column2', 'cell'];
    case 8:
      return ['row3', 'column3', 'cell'];
  }
};



function winner(currentPlayer, board) {
  const marker = currentPlayer.marker;
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
      hideAnnoucment();
      annouceWinner(currentPlayer);
      return true;
    };
  };
  return false;
};

function hideAnnoucment() {
  const annouceMsg = document.getElementById('annoucement-msg');
  annouceMsg.classList.add('hidden');
};

function annouceWinner(player) {
  const winnerDiv = document.querySelector('.winner-msg');

  winnerDiv.innerText = `${player.name} is the WINNER!`
  playAgain();
};

function checkTieGame(board) {
  if (board.includes(null)) {
    return false;
  } else {
    announceTie();

  }
};

function announceTie() {
  hideAnnoucment();
  const winnerDiv = document.querySelector('.winner-msg');
  winnerDiv.innerText = 'There are no moves available. TIE GAME'
  playAgain();
};


function playAgain() {
  toggleRestartButton();

  const restartBtn = document.querySelector('.restart-btn');

  restartBtn.addEventListener('click', () => {
    toggleRestartButton();
    location.reload();
  })
};

function toggleRestartButton() {
  const restartBtn = document.querySelector('.restart-btn');
  restartBtn.classList.toggle('hidden');
}
