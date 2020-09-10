class Ship {
  constructor(length) {
    this.blocks = length;
    this.hitPlaces = new Array(length).fill(0);
    this.sunk = false;
  }
  hit(place) {
    this.hitPlaces[place] = 1;
  }
  isSunk() {
    let sunk;
    this.hitPlaces.every((p) => p === 1) ? (sunk = true) : (sunk = false);
    return sunk;
  }
  getData() {
    const data = {
      blocks: this.blocks,
      hitPlaces: this.hitPlaces,
      sunk: this.sunk,
    };
    return data;
  }
}

export { Ship };
