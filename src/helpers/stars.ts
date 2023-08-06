import { MILLION, THOUSAND } from "../constants";

export const getStarsCount = (num: number): string => {
  let starsCount = "";

  if (num >= MILLION) {
    starsCount = Math.trunc(num / MILLION) + "M";
  } else if (num >= THOUSAND) {
    starsCount = Math.trunc(num / THOUSAND) + "K";
  } else {
    starsCount = num.toString();
  }

  return starsCount;
};
