export function validateDate(dateStr: string): { isValid: boolean; error?: string } {
  const regex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!regex.test(dateStr)) {
    return { isValid: false, error: 'Неверный формат. Используйте ДД.ММ.ГГГГ' };
  }
  const [day, month, year] = dateStr.split('.').map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return { isValid: false, error: 'Несуществующая дата' };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return { isValid: false, error: 'Дата не может быть раньше текущей' };
  }
  return { isValid: true };
}