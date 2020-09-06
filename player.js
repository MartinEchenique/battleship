class Player {
  constructor(name, isPc = false) {
    this.isPc = isPc;
    this.name = name;
    this.attacked = [];
  }
  attack() {
    let attackCoordinates;
    do {
      attackCoordinates = this.getCoordinates();
    } while (this.attacked.includes(attackCoordinates));
    this.attacked.push(attackCoordinates);
    return attackCoordinates;
  }
  getCoordinates() {
    const x = Math.floor(Math.random() * (10 + 1));
    const y = Math.floor(Math.random() * (10 + 1));
    return [x, y];
  }
}

module.exports = Player;
