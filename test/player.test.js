import { Player } from '../src/player';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;
it('pc player makes a play', () => {
  const player = new Player('Name', true);
  expect(player.attack()).toEqual([5, 5]);
});
