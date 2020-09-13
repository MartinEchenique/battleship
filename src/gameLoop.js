import { Player } from './player';
import { events } from './pubSub';
class Game {
  constructor() {
    this.playerOne = null;
    this.playerTwo = null;
    this.currentPlayer = null;
    this.nextPlayer = null;
  }
  createPlayers(players) {
    const playerOneInfo = players.playerOne;
    const playerTwoInfo = players.playerTwo;
    this.playerOne = new Player(playerOneInfo[0], playerOneInfo[1]);
    this.playerTwo = new Player(playerTwoInfo[0], playerTwoInfo[1]);
    this.currentPlayer = this.playerOne;
    this.nextPlayer = this.playerTwo;
  }
  placeShips() {
    this.dragAndDropBoat();
    this.playerTwo.putBoats();
    events.emit('board changed', this.playerTwo);
  }
  doShoot(i = null, j = null) {
    let x = i;
    let y = j;
    if (this.currentPlayer.name === 'pc') {
      [x, y] = this.currentPlayer.attack();
    }
    if (
      this.nextPlayer.gameBoard.board[x][y] !== 'miss' &&
      this.nextPlayer.gameBoard.board[x][y] !== 'hit'
    ) {
      this.nextPlayer.gameBoard.receiveAttack(x, y);
      events.emit('player attack', this.nextPlayer);
      this.currentPlayer = this.nextPlayer;
      this.currentPlayer === this.playerOne
        ? (this.nextPlayer = this.playerTwo)
        : (this.nextPlayer = this.playerOne);
      //return [this.currentPlayer, this.nextPlayer];
    }
  }
  dragAndDropBoat() {
    events.on('boat dragged and dropped', (data) => {
      let row = +data[0][0];
      let column = +data[0][1];
      let length = data[1];
      this.playerOne.gameBoard.placeShip(length, row, column);
    });
    events.emit('board changed', this.playerOne);
  }
}
function main() {
  const game = new Game();
  events.on('create players', (players) => {
    game.createPlayers(players);
    events.emit('board changed', game.playerOne);
    events.emit('board changed', game.playerTwo);

    gameLoop(game);
  });
}

async function gameLoop(game) {
  game.placeShips();
  await new Promise((resolve) => {
    events.on('all boats droped', () => resolve());
  });
  do {
    await new Promise(async (resolve) => {
      if (game.currentPlayer.name !== 'pc') {
        let [i, j] = await new Promise((resolve) =>
          events.on('square clicked', (data) => resolve(data)),
        );

        game.doShoot(i, j);
        resolve();
      } else {
        game.doShoot();
        resolve();
      }
    });
  } while (
    !game.playerOne.gameBoard.allSunk() &&
    !game.playerTwo.gameBoard.allSunk()
  );
  window.alert('gameOver');
}

export { main };
