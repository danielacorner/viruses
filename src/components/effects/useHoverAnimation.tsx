import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/** apply a little wobble to a 3d element */
export function useHoverAnimation({
  shouldAnimate = true,
  shouldResetPosition = false,
} = {}) {
  const ref = useRef(null as any);
  useFrame(({ clock }) => {
    if (!shouldAnimate) {
      return;
    }
    if (ref.current) {
      if (shouldResetPosition) {
        ref.current.position.y = 0;
        ref.current.position.x = 0;
        ref.current.position.z = 0;

        ref.current.rotation.x = 0;
        ref.current.rotation.y = 0;
        ref.current.rotation.z = 0;
        return;
      }
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.08;
      ref.current.position.x = Math.sin(clock.getElapsedTime()) * 0.05;
      ref.current.position.z = Math.sin(clock.getElapsedTime()) * 0.03;

      ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.03;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() - 2000) * 0.04;
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() + 1000) * 0.03;
    }
  });
  return ref;
}
