import { GameBoard } from './gameBoard';
class Player {
  constructor(name, isPc = false) {
    this.isPc = isPc;
    this.name = name;
    this.attacked = [];
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
  getCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }
}

export { Player };
