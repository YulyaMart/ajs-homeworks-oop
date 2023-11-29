import Bowerman from '../Bowerman';

test('создание Bowerman', () => {
  const result = new Bowerman('Bow');

  expect(result).toEqual({
    name: 'Bow',
    type: 'Bowerman',
    health: 100,
    level: 1,
    attack: 25,
    defence: 25,
  });
});
