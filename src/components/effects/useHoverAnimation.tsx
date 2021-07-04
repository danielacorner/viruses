import { useFrame } from "@react-three/fiber";

/** apply a little wobble to a 3d element */
export function useHoverPositionAnimation(ref) {
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.08;
      ref.current.position.x = Math.sin(clock.getElapsedTime()) * 0.05;
      ref.current.position.z = Math.sin(clock.getElapsedTime()) * 0.03;
    }
  });
}
export function useHoverRotationAnimation(ref) {
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.03;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() - 2000) * 0.04;
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() + 1000) * 0.03;
    }
  });
}
