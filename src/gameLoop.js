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
    for (let index = 0; index < 5; index++) {
      this.playerOne.gameBoard.placeShip(2, index, 5);
      this.playerTwo.gameBoard.placeShip(2, index, 1);
    }
  }
  doShoot(i = null, j = null) {
    let x = i;
    let y = j;
    console.log(i, j);
    if (this.currentPlayer.name === 'pc') {
      [x, y] = this.currentPlayer.attack();
    }
    this.nextPlayer.gameBoard.receiveAttack(x, y);
    events.emit('player attack', this.nextPlayer);
    this.currentPlayer = this.nextPlayer;
    this.currentPlayer === this.playerOne
      ? (this.nextPlayer = this.playerTwo)
      : (this.nextPlayer = this.playerOne);
    return [this.currentPlayer, this.nextPlayer];
  }
}
function main() {
  const game = new Game();
  events.on('create players', (players) => {
    game.createPlayers(players);
    gameLoop(game);
  });
}
async function gameLoop(game) {
  game.placeShips();
  do {
    [game.currentPlayer, game.nextPlayer] = await new Promise(
      async (resolve) => {
        if (game.currentPlayer.name !== 'pc') {
          let [i, j] = await new Promise((resolve) =>
            document.getElementById('playerOneBoard').addEventListener(
              'click',
              events.on('square clicked', (data) => resolve(data)),
            ),
          );

          let array = game.doShoot(i, j);
          resolve(array);
        } else {
          let array = game.doShoot();
          resolve(array);
        }
      },
    );
  } while (
    !game.playerOne.gameBoard.allSunk() &&
    !game.playerTwo.gameBoard.allSunk()
  );
  console.log('gameOver');
}

export { main };
