import { EffectCallback, useEffect } from "react";

export const PADDING = 6;

export function useMount(cb: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(cb, []);
}

export function randBetween(
  min: number,
  max: number,
  isNormalDist: boolean = false
): number {
  // randBetween(0,2)
  // randBetween(-2,2)
  return (isNormalDist ? rand_normal() : Math.random()) * (max - min) + min;
}

export function eitherOr(num1, num2) {
  return Math.random() > 0.5 ? num1 : num2;
}

// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
// normal distribution
function rand_normal() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return rand_normal(); // resample between 0 and 1
  return num;
}
