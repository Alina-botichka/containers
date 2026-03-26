import ErrorRepository from '../errorRepository';

describe('ErrorRepository class', () => {
  let errorRepo;

  beforeEach(() => {
    errorRepo = new ErrorRepository();
  });

  describe('constructor and initialization', () => {
    test('should create instance with default errors', () => {
      expect(errorRepo).toBeInstanceOf(ErrorRepository);
      expect(errorRepo.size()).toBe(11);
    });

    test('should have correct default errors', () => {
      expect(errorRepo.translate(200)).toBe('Успешно');
      expect(errorRepo.translate(404)).toBe('Не найдено');
      expect(errorRepo.translate(500)).toBe('Внутренняя ошибка сервера');
    });
  });

  describe('translate method', () => {
    test('should return correct description for existing error code', () => {
      expect(errorRepo.translate(200)).toBe('Успешно');
      expect(errorRepo.translate(400)).toBe('Некорректный запрос');
      expect(errorRepo.translate(404)).toBe('Не найдено');
      expect(errorRepo.translate(500)).toBe('Внутренняя ошибка сервера');
    });

    test('should return "Unknown error" for non-existent error code', () => {
      expect(errorRepo.translate(999)).toBe('Unknown error');
      expect(errorRepo.translate(0)).toBe('Unknown error');
      expect(errorRepo.translate(-1)).toBe('Unknown error');
    });
  });

  describe('addError method', () => {
    test('should add new error', () => {
      errorRepo.addError(600, 'Новая ошибка');
      expect(errorRepo.hasError(600)).toBe(true);
      expect(errorRepo.translate(600)).toBe('Новая ошибка');
      expect(errorRepo.size()).toBe(12);
    });

    test('should throw error when adding duplicate error code', () => {
      expect(() => errorRepo.addError(200, 'Дубликат')).toThrow('Ошибка с кодом 200 уже существует');
    });
  });

  describe('hasError method', () => {
    test('should return true for existing error', () => {
      expect(errorRepo.hasError(200)).toBe(true);
      expect(errorRepo.hasError(404)).toBe(true);
    });

    test('should return false for non-existing error', () => {
      expect(errorRepo.hasError(999)).toBe(false);
      expect(errorRepo.hasError(0)).toBe(false);
    });
  });

  describe('removeError method', () => {
    test('should remove existing error', () => {
      const result = errorRepo.removeError(404);
      expect(result).toBe(true);
      expect(errorRepo.hasError(404)).toBe(false);
      expect(errorRepo.size()).toBe(10);
    });

    test('should return false when removing non-existing error', () => {
      const result = errorRepo.removeError(999);
      expect(result).toBe(false);
    });
  });

  describe('size method', () => {
    test('should return correct initial size', () => {
      expect(errorRepo.size()).toBe(11);
    });
  });

  describe('clear method', () => {
    test('should reset to default errors', () => {
      errorRepo.addError(601, 'Временная ошибка');
      errorRepo.removeError(404);
      errorRepo.clear();
      expect(errorRepo.size()).toBe(11);
      expect(errorRepo.hasError(404)).toBe(true);
      expect(errorRepo.translate(200)).toBe('Успешно');
    });
  });
});
