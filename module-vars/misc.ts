export function isLeapYear(year: number) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

export function getYearPogress(date: Date) {
  const startOfTheYear = new Date(date.getFullYear(), 0, 1);
  const diffInMs = date.getTime() - startOfTheYear.getTime();
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

export function timePassedInADay() {
  const date = new Date();
  const current = date.getMinutes() + date.getHours() * 60;
  return Math.floor((current * 100) / (24 * 60));
}
