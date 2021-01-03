import React, { useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import { useStore } from "../../store";

export function SingleParticle({ ChildParticle, position, mass, interactive }) {
  // TODO: make NonInteractiveParticle instanced for better performance?
  // TODO: make InteractiveParticle instanced for better performance?
  const Particle = interactive ? InteractiveParticle : NonInteractiveParticle;
  return (
    <Particle
      {...{
        mass,
        position,
        ChildParticle,
      }}
    />
  );
}

/** interacts with other particles using @react-three/cannon */
function InteractiveParticle({ position, ChildParticle, mass }) {
  // TODO:
  // const temperature=useStore(state=>state.temperature)

  const [ref] = useSphere(() => ({
    mass,
    position,
    args: 1,
  }));
  useJitterParticle({
    mass,
    ref,
  });
  const scale = useStore((state) => state.scale);

  return (
    <mesh ref={ref} scale={[scale, scale, scale]}>
      <ChildParticle />
    </mesh>
  );
}

/** doesn't interact with other particles (passes through them) */
function NonInteractiveParticle({
  temperature,
  mass,
  position,
  ChildParticle,
}) {
  const ref = useRef();
  useJitterParticle({
    mass,
    ref,
  });
  const scale = useStore((state) => state.scale);

  return (
    <mesh ref={ref} scale={[scale, scale, scale]} position={position}>
      <ChildParticle />
    </mesh>
  );
}
