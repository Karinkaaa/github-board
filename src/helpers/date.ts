import {
  DAYS_IN_WEEK,
  HOURS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  MONTHS_IN_YEAR,
  SECONDS_IN_HOUR,
} from "../constants";

function daysInCurrentMonth(): number {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  return new Date(year, month, 0).getDate();
}

export const getDateDifference = (date1: Date, date2: Date): string => {
  const diff = Math.floor(
    new Date(date1).getTime() - new Date(date2).getTime()
  );

  const seconds = Math.floor(diff / MILLISECONDS_IN_SECOND);
  const minutes = Math.floor(diff / (MILLISECONDS_IN_SECOND * MINUTES_IN_HOUR));
  const hours = Math.floor(diff / (MILLISECONDS_IN_SECOND * SECONDS_IN_HOUR));
  const days = Math.floor(diff / (MILLISECONDS_IN_SECOND * SECONDS_IN_HOUR * HOURS_IN_DAY));
  const weeks = Math.floor(days / DAYS_IN_WEEK);
  const months = Math.floor(days / daysInCurrentMonth());
  const years = Math.floor(months / MONTHS_IN_YEAR);

  if (years > 0) {
    return years === 1 ? "last year" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "last month" : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "last week" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "yesterday" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds === 1 ? "a second ago" : `${seconds} seconds ago`;
  }
};
