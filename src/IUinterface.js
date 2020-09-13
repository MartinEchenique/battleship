import { events } from './pubSub';

function generateBoard(id) {
  const container = document.getElementById(id);
  for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.classList.add('gridRow');
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      square.classList.add('gridSquare');
      square.setAttribute('data-coordinates', `${[i, j]}`);
      row.appendChild(square);
    }
    container.appendChild(row);
  }
}
function addClickEvent(board) {
  getBoard(board).forEach((elemento, i) => {
    elemento.map((square, j) => {
      square.addEventListener('click', () =>
        events.emit('square clicked', [i, j]),
      );
    });
  });
}

function startGame() {
  generateBoard('playerTwoBoard');
  generateBoard('playerOneBoard');
  addClickEvent('playerTwoBoard');
  const playersInfo = { playerOne: ['tin', true], playerTwo: ['pc', false] };
  placeBoat();
  events.on('player attack', pupulateBoard);
  events.on('board changed', pupulateBoard);
  events.emit('create players', playersInfo);
}
function pupulateBoard(player) {
  let currentBoard = player.gameBoard.board;
  let boardId = player.name === 'pc' ? 'playerTwoBoard' : 'playerOneBoard';
  const displayGrid = getBoard(boardId);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let boardSquare = currentBoard[i][j];
      let displaySquare = displayGrid[i][j];
      switch (boardSquare) {
        case -1:
          displaySquare.classList.add('watter');

          break;

        case 'hit':
          displaySquare.style.backgroundColor = 'orange';
          break;
        case 'miss':
          displaySquare.style.backgroundColor = 'grey';
          break;
        case 'sunk':
          displaySquare.style.backgroundColor = 'red';
          break;
        default:
          boardId === 'playerTwoBoard'
            ? (displaySquare.style.backgroundColor = 'blue')
            : (displaySquare.style.backgroundColor = 'green');

          break;
      }
    }
  }
}

function getBoard(boardId) {
  const grid = Array.from(
    document.getElementById(boardId).childNodes,
  ).map((row) => Array.from(row.childNodes));
  return grid;
}

function placeBoat() {
  events.on('boat dragged and dropped', (data) => {
    let row = +data[0][0];
    let column = +data[0][1];
    let length = data[1];
    let board = getBoard('playerOneBoard');
    for (let i = 0; i < length; i++) {
      board[row][column + i].style.backgroundColor = 'green';
    }
  });
}

export { startGame };
