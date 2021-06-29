import { useRef, useState } from "react";
import { useStore } from "../store";
import { useSpring } from "@react-spring/core";
import { useMount } from "../utils/utils";

/** animate a value to a target value over a certain time */
// function useAnimateAfterTimeout({
//   target,
//   startTime,
//   endTime,
//   property,
// }: {
//   target: number;
//   startTime: number;
//   endTime: number;
//   property: string;
// }) {
//   const set = useStore((s) => s.set);
//   const current = useStore((s) => s[property]);
//   const delta = (target - current) / 10; /* <- animation function */
//   useFrame(({ clock }) => {
//     const time = clock.elapsedTime * 1000 - clock.startTime;
//     const shouldAnimate = clock.running && startTime < time && time < endTime;
//     if (shouldAnimate) {
//       const nextValue = target - delta;
//       set({ [property]: nextValue });
//     }
//   });
// }
/** animate a value to a target value over a certain time */
export function useSpringStoreAfterTimeout({
  target,
  startTime,
  property,
  springConfig,
}: {
  target: number;
  startTime: number;
  property: string;
  springConfig: any;
}) {
  const set = useStore((s) => s.set);
  const current = useStore((s) => s[property]);
  const firstValue = useRef(current).current;
  const delta = target - firstValue;

  const [animating, setAnimating] = useState(0);

  // https://codesandbox.io/s/react-spring-v9-rc-6hi1y?file=/src/index.js:983-1012
  // set up a spring to bounce from 0 to 1
  // set the stored value based on this progress %
  useSpring({
    progress: animating,
    config: springConfig,
    onChange({ progress }) {
      set({ [property]: firstValue + delta * progress });
    },
  });

  // start the timer
  useMount(() => {
    setTimeout(() => {
      setAnimating(1);
    }, startTime);
  });
}

export function useSpringStoreImmediately({
  target,
  property,
  springConfig,
  setterFn,
}: {
  target: number;
  property: string;
  springConfig: any;
  setterFn?: any;
}) {
  const set = useStore((s) => s.set);
  const current = useStore((s) => s[property]);
  const firstValue = useRef(current).current;
  const delta = target - firstValue;

  const [animating, setAnimating] = useState(0);

  // https://codesandbox.io/s/react-spring-v9-rc-6hi1y?file=/src/index.js:983-1012
  // set up a spring to bounce from 0 to 1
  // set the stored value based on this progress %
  useSpring({
    progress: animating,
    config: springConfig,
    onChange({ progress }) {
      if (!progress) {
        return;
      }
      if (setterFn) {
        console.log("🌟🚨 ~ onChange ~ firstValue", firstValue);
        console.log(
          "🌟🚨 ~ onChange ~ firstValue + delta * progress",
          firstValue + delta * progress
        );
        console.log("🌟🚨 ~ onChange ~ delta", delta);
        console.log("🌟🚨 ~ onChange ~ progress", progress);
        setterFn(firstValue + delta * progress);
      } else {
        // generic set - worse performance
        set({ [property]: firstValue + delta * progress });
      }
      if (progress === 1) {
        set({ isPropertyAnimating: false });
      }
    },
  });

  // start the timer
  useMount(() => {
    setAnimating(1);
    set({ isPropertyAnimating: true });
  });
}
