import { randBetween } from "../../utils/utils";

export const getRandStartPosition = (min, max) => [
  randBetween(min, max),
  randBetween(min, max),
  randBetween(min, max),
];
