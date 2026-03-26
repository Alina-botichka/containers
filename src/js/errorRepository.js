export default class ErrorRepository {
  constructor() {
    this.errors = new Map();
    this.initializeErrors();
  }

  initializeErrors() {
    this.errors.set(100, 'Продолжить');
    this.errors.set(101, 'Переключение протоколов');
    this.errors.set(200, 'Успешно');
    this.errors.set(201, 'Создано');
    this.errors.set(400, 'Некорректный запрос');
    this.errors.set(401, 'Не авторизован');
    this.errors.set(403, 'Доступ запрещён');
    this.errors.set(404, 'Не найдено');
    this.errors.set(500, 'Внутренняя ошибка сервера');
    this.errors.set(502, 'Плохой шлюз');
    this.errors.set(503, 'Сервис недоступен');
  }

  addError(code, description) {
    if (this.errors.has(code)) {
      throw new Error(`Ошибка с кодом ${code} уже существует`);
    }
    this.errors.set(code, description);
  }

  translate(code) {
    return this.errors.get(code) || 'Unknown error';
  }

  hasError(code) {
    return this.errors.has(code);
  }

  removeError(code) {
    return this.errors.delete(code);
  }

  size() {
    return this.errors.size;
  }

  clear() {
    this.errors.clear();
    this.initializeErrors();
  }
}
