export function validateCity(city: string): { isValid: boolean; error?: string } {
  if (!city || city.trim() === '') {
    return { isValid: false, error: 'Введите название города или страны' };
  }
  if (/[<>&"']/.test(city)) {
    return { isValid: false, error: 'Недопустимые символы' };
  }
  return { isValid: true };
}