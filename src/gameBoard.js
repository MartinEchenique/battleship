import { Ship as shipFactory } from './ship';

class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill(-1)
      .map(() => Array(10).fill(-1));
    this.ships = [];
  }
  placeShip(length, x, y) {
    const newShip = new shipFactory(length);
    for (let index = 0; index < length; index++) {
      this.board[x][y + index] = this.ships.length;
    }
    this.ships.push({ ship: newShip, start: y });
  }
  receiveAttack(x, y) {
    const target = this.board[x][y];
    switch (target) {
      case 'hit':
      case 'miss':
        return target;
        break;
      case -1:
        this.board[x][y] = 'miss';
        break;
      default:
        const shipHitted = this.ships[target];
        shipHitted.ship.hit(y - shipHitted.start);
        shipHitted.ship.isSunk()
          ? this.shipHitBoard(shipHitted, x)
          : (this.board[x][y] = 'hit');
        break;
    }
  }
  shipHitBoard(ship, x) {
    for (let i = 0; i < ship.ship.blocks; i++) {
      this.board[x][ship.start + i] = 'sunk';
    }
  }
  allSunk() {
    const areAllSunk = this.ships.every((shipPlaced) =>
      shipPlaced.ship.isSunk(),
    );
    return areAllSunk;
  }
}

export { GameBoard };
