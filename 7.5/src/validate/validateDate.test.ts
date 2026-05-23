import { validateDate } from './validateDate';

describe('validateDate', () => {
  test('валидация даты пропускает дату в виде ДД.ММ.ГГГГ', () => {
    const result = validateDate('15.08.2030');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  test('валидация даты не пропускает спецсимволы', () => {
    const result = validateDate('15/08/2030');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('формат');
  });

  test('валидация даты не пропускает буквенные значения', () => {
    const result = validateDate('ab.cd.efgh');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('формат');
  });

  test('валидация даты выдаёт предупреждение, если дата раньше текущей', () => {
    const pastDate = '01.01.2000';
    const result = validateDate(pastDate);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('раньше текущей');
  });
});