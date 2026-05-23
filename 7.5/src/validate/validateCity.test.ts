import { validateCity } from './validateCity';

describe('validateCity', () => {
  test('валидация города выдаёт предупреждение, если есть экранирование', () => {
    const result = validateCity('<script>');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Недопустимые символы');
  });

  test('валидация города пропускает название с восклицательным знаком или дефисами (например, Saint-Louis-du-Ha! Ha!)', () => {
    const city = 'Saint-Louis-du-Ha! Ha!';
    const result = validateCity(city);
    expect(result.isValid).toBe(true);
  });

  test('валидация города пропускает название со спецсимволами (например, Ağrı)', () => {
    const city = 'Ağrı';
    const result = validateCity(city);
    expect(result.isValid).toBe(true);
  });

  test('валидация города пропускает название из одной буквы', () => {
    const city = 'A';
    const result = validateCity(city);
    expect(result.isValid).toBe(true);
  });
});