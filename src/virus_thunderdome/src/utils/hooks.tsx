import { useState, useEffect, useRef } from "react";

export function useWindowSize() {
  // (For SSR apps only?) Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
    return () => {
      ref.current = undefined;
    };
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

/**
 * Run an effect, only once, when a condition is met
 * @param callback callback to fire when shouldRun = true
 * @param shouldRun whether we should fire the callback
 * @param dependencies when these change, check again if shouldRun = true
 */
export function useEffectOnce({
  callback,
  shouldRun,
  dependencies,
}: {
  callback: Function;
  shouldRun: boolean;
  dependencies: any[];
}) {
  const didRun = useRef(false);
  let dependenciesToUse = dependencies;

  useEffect(() => {
    if (shouldRun && !didRun.current) {
      // once we fire, cancel the useEffect
      callback();
      didRun.current = true;
      // eslint-disable-next-line
      dependenciesToUse = []; // this line cancels the effect
    }
  }, dependenciesToUse);
}
