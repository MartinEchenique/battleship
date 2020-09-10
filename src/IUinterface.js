import { events } from './pubSub';

function generateBoard(id) {
  const container = document.getElementById(id);
  for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.classList.add('gridRow');
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      square.classList.add('gridSquare');
      square.setAttribute('data', `${[i, j]}`);
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
  addClickEvent('playerOneBoard');
  const playersInfo = { playerOne: ['tin', true], playerTwo: ['pc', false] };
  events.on('player attack', pupulateBoard);
  events.emit('create players', playersInfo);
}
function pupulateBoard(player) {
  let currentBoard = player.gameBoard.board;
  let boardId = player.name === 'pc' ? 'playerOneBoard' : 'playerTwoBoard';
  const displayGrid = getBoard(boardId);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let boardSquare = currentBoard[i][j];
      let displaySquare = displayGrid[i][j];
      switch (boardSquare) {
        case -1:
          displaySquare.style.backgroundColor = 'blue';
          break;

        case 'hit':
          displaySquare.style.backgroundColor = 'red';
          break;
        case 'miss':
          displaySquare.style.backgroundColor = 'grey';
          break;
        default:
          displaySquare.style.backgroundColor = 'green';

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
export { startGame };
