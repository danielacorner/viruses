import { EffectCallback, useEffect, useRef } from "react";

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
  while (u === 0) {
    u = Math.random();
  } // Converting [0,1) to (0,1)
  while (v === 0) {
    v = Math.random();
  }
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) {
    return rand_normal();
  } // resample between 0 and 1
  return num;
}

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// https://github.com/Hermanya/use-interval/blob/master/src/index.tsx
// * not set up to work with delay = 0
/**
 * a dynamic setInterval
 *
 * @param callback function to call on the interval
 * @param delay milliseconds between each call
 * @param immediate should call the callback right away?
 */
export const useInterval = ({
  callback,
  delay,
  immediate = false /* called when mounted if true */,
}: {
  callback: () => void;
  delay: number | null | false;
  immediate: boolean;
}) => {
  const savedCallback = useRef(null as Function | null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
    return () => {
      savedCallback.current = null;
    };
  }, [callback]);

  // Execute callback if immediate is set & delay exists.
  const firstDelayRef = useRef(delay);
  useEffect(() => {
    if (immediate && firstDelayRef.current && savedCallback.current) {
      savedCallback.current();
    }
  }, [immediate]);

  // Set up the interval.
  useEffect(() => {
    if (!delay) {
      return undefined;
    }

    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    let intervalId;

    if (delay !== null) {
      intervalId = setInterval(tick, delay);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [delay]);
};
