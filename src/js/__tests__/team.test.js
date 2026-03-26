import Team from '../team';
import Character from '../character';

describe('Team class', () => {
  let team;
  let character1;
  let character2;
  let character3;

  beforeEach(() => {
    team = new Team();
    character1 = new Character('Маг', 'mage', 100, 1);
    character2 = new Character('Воин', 'warrior', 80, 2);
    character3 = new Character('Лучник', 'archer', 90, 1);
  });

  describe('constructor', () => {
    test('should create empty team', () => {
      expect(team.members).toBeInstanceOf(Set);
      expect(team.members.size).toBe(0);
    });
  });

  describe('add method', () => {
    test('should add character to team', () => {
      team.add(character1);
      expect(team.members.size).toBe(1);
      expect(team.members.has(character1)).toBe(true);
    });

    test('should throw error when adding duplicate character', () => {
      team.add(character1);
      expect(() => team.add(character1)).toThrow('Персонаж уже существует в команде');
    });

    test('should allow adding different characters', () => {
      team.add(character1);
      team.add(character2);
      expect(team.members.size).toBe(2);
      expect(team.members.has(character1)).toBe(true);
      expect(team.members.has(character2)).toBe(true);
    });
  });

  describe('addAll method', () => {
    test('should add multiple characters', () => {
      team.addAll(character1, character2, character3);
      expect(team.members.size).toBe(3);
      expect(team.toArray()).toHaveLength(3);
    });

    test('should add characters without duplicates', () => {
      team.addAll(character1, character2, character1, character3);
      expect(team.members.size).toBe(3);
      expect(team.toArray()).toHaveLength(3);
    });

    test('should handle empty parameters', () => {
      team.addAll();
      expect(team.members.size).toBe(0);
    });

    test('should not throw error when adding duplicates', () => {
      team.addAll(character1, character1, character1);
      expect(team.members.size).toBe(1);
    });
  });

  describe('toArray method', () => {
    test('should convert Set to array', () => {
      team.addAll(character1, character2);
      const arr = team.toArray();
      expect(Array.isArray(arr)).toBe(true);
      expect(arr).toHaveLength(2);
      expect(arr).toContain(character1);
      expect(arr).toContain(character2);
    });

    test('should return empty array when team is empty', () => {
      const arr = team.toArray();
      expect(arr).toEqual([]);
    });

    test('should return new array each time', () => {
      team.addAll(character1);
      const arr1 = team.toArray();
      const arr2 = team.toArray();
      expect(arr1).toEqual(arr2);
      expect(arr1).not.toBe(arr2);
    });
  });

  describe('integration tests', () => {
    test('should handle sequence of operations', () => {
      team.add(character1);
      team.addAll(character2);
      team.addAll(character3, character1);

      expect(team.members.size).toBe(3);
      expect(team.toArray()).toHaveLength(3);
      expect(team.toArray()).toContain(character1);
      expect(team.toArray()).toContain(character2);
      expect(team.toArray()).toContain(character3);
    });

    test('should maintain Set uniqueness', () => {
      const sameCharacter = character1;
      team.add(character1);
      team.addAll(sameCharacter, character2);
      expect(team.members.size).toBe(2);
    });
  });
});
