import Character from '../character';

describe('Character class', () => {
  test('should create character with default values', () => {
    const character = new Character('Маг', 'mage');
    expect(character.name).toBe('Маг');
    expect(character.type).toBe('mage');
    expect(character.health).toBe(100);
    expect(character.level).toBe(1);
  });

  test('should create character with custom health and level', () => {
    const character = new Character('Воин', 'warrior', 80, 2);
    expect(character.name).toBe('Воин');
    expect(character.type).toBe('warrior');
    expect(character.health).toBe(80);
    expect(character.level).toBe(2);
  });

  test('should create character with zero health', () => {
    const character = new Character('Мертвец', 'undead', 0, 1);
    expect(character.health).toBe(0);
  });
});
