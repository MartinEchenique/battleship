import { GameBoard } from './gameBoard';
class Player {
  constructor(name, isPc = false) {
    this.isPc = isPc;
    this.name = name;
    this.attacked = [];
    this.boats = [
      [null, 5],
      [null, 5],
      [null, 3],
      [null, 1],
      [null, 1],
    ];
    this.gameBoard = new GameBoard();
  }
  attack() {
    let attackCoordinates;
    do {
      attackCoordinates = this.getCoordinates();
    } while (this.CoordinatesAttacked(attackCoordinates));
    this.attacked.push(attackCoordinates);
    return attackCoordinates;
  }
  CoordinatesAttacked(arr) {
    for (let i = 0; i < this.attacked.length; i++) {
      if (this.attacked[i][0] === arr[0] && this.attacked[i][1] === arr[1])
        return true;
    }
    return false;
  }
  boatInPlace(arr, length) {
    let x = arr[0];
    let y = arr[1];
    return this.boats.some((boat) => {
      if (
        boat[0] &&
        boat[0][0] === x &&
        y + length >= boat[0][1] &&
        y <= boat[0][1] + boat[1]
      ) {
        return true;
      }
    });
  }
  boatFit(y, length) {
    if (y + length < 10) return true;
    return false;
  }
  putBoats() {
    this.boats.forEach((boat) => {
      let boatCoordinates;
      do {
        boatCoordinates = this.getCoordinates();
      } while (
        this.boatInPlace(boatCoordinates, boat[1]) ||
        !this.boatFit(boatCoordinates[1], boat[1])
      );
      boat[0] = boatCoordinates;
    });
    this.boats.forEach((boat) => {
      this.gameBoard.placeShip(boat[1], boat[0][0], boat[0][1]);
    });
    return true;
  }
  getCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
}

export { Player };
