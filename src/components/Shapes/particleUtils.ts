import { randBetween } from "../../utils/utils";

export const getRandPosition = (worldRadius): [number, number, number] => [
  randBetween(-worldRadius, worldRadius),
  randBetween(-worldRadius, worldRadius),
  randBetween(-worldRadius, worldRadius),
];
