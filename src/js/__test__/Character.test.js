import Character from '../Character';

const invalidParams = [
  [150, 'Bowerman', 'Некорректное имя персонажа'],
  ['A', 'Bowerman', 'Некорректное имя персонажа'],
  ['LongCharacterName', 'Bowerman', 'Некорректное имя персонажа'],
  ['Bowerman', 'Bo', 'Некорректный типа персонажа'],
  ['Bowerman', undefined, 'Некорректный типа персонажа'],
  ['Bowerman', 150, 'Некорректный типа персонажа'],
];

test.each(invalidParams)(
  'should throw Error for invalid parameters %p',
  (name, type, errorMessage) => {
    expect(() => new Character(name, type)).toThrow(errorMessage);
  },
);

test('should create Character for name "String"', () => {
  const result = new Character('String', 'Bowerman');

  expect(result).toEqual({
    name: 'String',
    type: 'Bowerman',
    health: 100,
    level: 1,
    attack: undefined,
    defence: undefined,
  });
});

test('should be Error for health <= 0 and level up', () => {
  expect(() => {
    const bowerman = new Character('Bowerman', 'Bowerman');
    bowerman.attack = 25;
    bowerman.defence = 25;
    bowerman.damage(135); // health drops to 0
    bowerman.levelUp();
  }).toThrow('Нельзя повысить уровень умершего');
});

test('should not decrease health when the character is already dead', () => {
  const deadBowerman = new Character('Bowerman', 'Bowerman');
  deadBowerman.attack = 25;
  deadBowerman.defence = 25;
  deadBowerman.health = 0;
  deadBowerman.damage(50);
  expect(deadBowerman.health).toBe(0);
});

test('should level, attack, defence, health up to 2, 30, 30, 100', () => {
  const user = new Character('String', 'Bowerman');
  user.attack = 25;
  user.defence = 25;
  user.levelUp();

  expect(user).toEqual({
    name: 'String',
    type: 'Bowerman',
    health: 100,
    level: 2,
    attack: 30,
    defence: 30,
  });
});

test('should health down to 97', () => {
  const user = new Character('String', 'Bowerman');
  user.attack = 25;
  user.defence = 25;
  user.damage(4);

  expect(user).toEqual({
    name: 'String',
    type: 'Bowerman',
    health: 97,
    level: 1,
    attack: 25,
    defence: 25,
  });
});
