import type { DateTime } from "types/@girs/glib-2.0/glib-2.0.cjs";

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

export function timePassedInADay(date: DateTime) {
  const current = date.get_minute() + date.get_hour() * 60;
  return Math.floor((current * 100) / (24 * 60));
}
