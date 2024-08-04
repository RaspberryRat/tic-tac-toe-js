console.log('Welcome to TIC TAC TOE')


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

const playerOne = createPlayer('greg');
const playerTwo = createPlayer('belinda');

console.log(playerOne, playerTwo)
