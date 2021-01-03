import { useFrame } from "react-three-fiber";
import { randBetween } from "../../utils/utils";
import * as THREE from "three";

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

export function useJitterParticle({ temperature, mass, ref }) {
  // based on the temperature, we can determine the velocity change
  // https://courses.lumenlearning.com/boundless-chemistry/chapter/kinetic-molecular-theory/#:~:text=It%20is%20represented%20by%20the,is%20the%20temperature%20in%20Kelvin.
  // v =~ sqrt( temperature / mass )
  const velocity = (temperature / mass) ** 0.5 / 50;
  const jitterPosition = velocity;
  const jitterRotation = velocity * 10;
  const rPos = () => randBetween(-jitterPosition, jitterPosition);
  const rRot = () => randBetween(-jitterRotation, jitterRotation);

  useFrame(() => {
    if (ref.current) {
      // jitter rotation
      ref.current.rotation.x = ref.current.rotation.x + rRot();
      ref.current.rotation.y = ref.current.rotation.y + rRot();
      ref.current.rotation.z = ref.current.rotation.z + rRot();

      // jitter position
      ref.current.position.x = ref.current.position.x + rPos();
      ref.current.position.y = ref.current.position.y + rPos();
      ref.current.position.z = ref.current.position.z + rPos();
    }
  });
}
