import { useFrame } from "react-three-fiber";
import { randBetween, useMount } from "../../utils/utils";
import * as THREE from "three";
import { useStore } from "../../store";
import { useEffect, useRef } from "react";

const dummy = new THREE.Object3D();

export function useJitterInstanceParticle({
  jitterRotation = 0.01,
  jitterPosition = 0.01,
  numParticles,
  ref,
}) {
  // useMount(() => {
  //   if (!ref.current) {
  //     return;
  //   }
  //   dummy.position.set(0, 0, 0);
  //   ref.current.setMatrixAt(0, dummy.matrix);
  //   ref.current.instanceMatrix.needsUpdate = true;
  // });
  useFrame((state) => {
    if (!ref.current) {
      return;
    }
    let i = 0;
    const rPos = () => randBetween(-jitterPosition, jitterPosition);
    const rRot = () => randBetween(-jitterRotation, jitterRotation);
    for (let idx = 0; idx < numParticles; idx++) {
      // jitter rotation
      dummy.rotation.x = dummy.rotation.x + rRot();
      dummy.rotation.y = dummy.rotation.y + rRot();
      dummy.rotation.z = dummy.rotation.z + rRot();
      // jitter position
      const { x, y, z } = ref.current.position;
      dummy.position.set(x + rPos(), y + rPos(), z + rPos());
      dummy.updateMatrix();
      ref.current.setMatrixAt(i++, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });
}
type WorkerVec = {
  set: (x: number, y: number, z: number) => void;
  copy: ({ x, y, z }: THREE.Vector3 | THREE.Euler) => void;
  subscribe: (callback: (value: number[]) => void) => void;
};
export function useJitterParticle({ mass, ref, api = {} as any }) {
  console.log("🌟🚨 ~ useJitterParticle ~ api", api);
  const temperature = useStore((state) => state.temperature);
  // based on the temperature, we can determine the velocity change
  // https://courses.lumenlearning.com/boundless-chemistry/chapter/kinetic-molecular-theory/#:~:text=It%20is%20represented%20by%20the,is%20the%20temperature%20in%20Kelvin.
  // v =~ sqrt( temperature / mass )
  const velocity = (temperature / mass) ** 0.5;
  const currentVelocity = useRef([0, 0, 0]);
  useMount(() => api.velocity.subscribe((v) => (currentVelocity.current = v)));
  console.log("🌟🚨 ~ useJitterParticle ~ currentVelocity", currentVelocity);
  console.log("🌟🚨 ~ useJitterParticle ~ velocity", velocity);

  // ? ONLY when the temperature changes, change the velocity
  useEffect(() => {
    const [x, y, z] = currentVelocity.current;
    const MAX_VELOCITY = 6;
    const [newX, newY, newZ] = [
      velocity * randBetween(-MAX_VELOCITY, MAX_VELOCITY),
      velocity * randBetween(-MAX_VELOCITY, MAX_VELOCITY),
      velocity * randBetween(-MAX_VELOCITY, MAX_VELOCITY),
    ];
    // const [newX, newY, newZ] = [
    //   (x + temperature ** 2) * (1 + velocity),
    //   (y + temperature ** 2) * (1 + velocity),
    //   (z + temperature ** 2) * (1 + velocity),
    // ];
    api.velocity.set(newX, newY, newZ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temperature]);

  const jitterPosition = temperature * 0.001; // ???
  const jitterRotation = temperature * 0.005; // ???
  const rPos = () => randBetween(-jitterPosition, jitterPosition);
  const rRot = () => randBetween(-jitterRotation, jitterRotation);

  useFrame(() => {
    if (ref.current) {
      // jitter rotation
      ref.current.rotation.x = ref.current.rotation.x + rRot();
      ref.current.rotation.y = ref.current.rotation.y + rRot();
      ref.current.rotation.z = ref.current.rotation.z + rRot();

      // // jitter position
      ref.current.position.x = ref.current.position.x + rPos();
      ref.current.position.y = ref.current.position.y + rPos();
      ref.current.position.z = ref.current.position.z + rPos();
    }
  });
}
