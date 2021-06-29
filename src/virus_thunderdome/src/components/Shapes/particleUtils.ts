import { randBetween } from "../../utils/utils";

export const getRandStartPosition = (worldRadius): [number, number, number] => [
	randBetween(-worldRadius, worldRadius),
	randBetween(-worldRadius, worldRadius),
	randBetween(-worldRadius, worldRadius),
];
