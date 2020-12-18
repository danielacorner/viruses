import { EffectCallback, useEffect } from "react";

export const PADDING = 6;

export function useMount(cb: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(cb, []);
}

export function randBetween(min: number, max: number): number {
  // randBetween(0,2)
  // randBetween(-2,2)
  return Math.random() * (max - min) + min;
}
