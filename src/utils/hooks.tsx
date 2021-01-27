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

export const usePreviousIf = (value, condition: boolean) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    if (condition) {
      ref.current = value;
    }
    return () => {
      // if (condition) {
      //   ref.current = undefined;
      // }
    };
  }, [value, condition]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};

// https://usehooks.com/useEventListener/
/** Create an event listener on an element or the window. Self-cleaning! ✨
 * @param eventName event type e.g. "click", "mousemove" etc
 * @param handler callback function for event listener
 * @param [element] element to listen on (default = window)
 */
export function useEventListener(
  eventName: string,
  handler: Function,
  element: Element | Window = window
) {
  // Create a ref that stores handler
  const savedHandler = useRef(null as Function | null);

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element?.addEventListener;
      if (!isSupported) {
        return;
      }

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) =>
        savedHandler.current ? savedHandler.current(event) : null;

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}
