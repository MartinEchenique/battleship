import { Ship as shipFactory } from '../src/ship';

it('ship is created', () => {
  const ship = new shipFactory(3);
  expect(ship.getData()).toEqual({
    blocks: 3,
    hitPlaces: [0, 0, 0],
    sunk: false,
  });
});

it('ship is hit', () => {
  const ship = new shipFactory(3);
  ship.hit(1);
  expect(ship.getData()).toEqual({
    blocks: 3,
    hitPlaces: [0, 1, 0],
    sunk: false,
  });
});

it('ship is sunk', () => {
  const ship = new shipFactory(3);
  ship.hit(1);
  ship.hit(0);
  ship.hit(2);
  expect(ship.isSunk()).toEqual(true);
});
