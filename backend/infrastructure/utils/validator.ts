export class Validator {
  public static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public static isNotEmpty(value: any): boolean {
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    return true;
  }

  public static isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  public static isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}
