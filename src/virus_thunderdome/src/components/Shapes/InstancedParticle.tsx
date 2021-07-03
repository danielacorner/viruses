import { useMemo, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useSpring, a } from "react-spring/three";
import { useJitterInstanceParticle } from "../Physics/useJitterParticle";
// https://discourse.threejs.org/t/there-is-no-gltfloader-in-three-module/16117/4
import { useGLTF } from "../../utils/useGltf";

import { getRandPosition } from "./particleUtils";
import { useStore } from "../../store";
// import * as antibody from "./models/1bv1/scene.gltf";

const InstancedParticle = ({
  ChildParticle,
  scale,
  temperature,
  numParticles,
  pathToGLTF,
  jittery,
}) => {
  const worldRadius = useStore((state) => state.worldRadius);

  // https://codesandbox.io/s/may-with-60fps-your-web-site-run-xj31x?from-embed=&file=/src/index.js:297-1112

  const [ref] = useSphere(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    mass: 1,
    position: getRandPosition(worldRadius),
    args: 1, // ? https://codesandbox.io/s/r3f-cannon-instanced-physics-devf8?file=/src/index.js
  }));

  useJitterInstanceParticle({
    jitterPosition: !jittery ? 0 : temperature,
    jitterRotation: !jittery ? 0 : temperature,
    numParticles,
    ref,
  });

  const usedgltf = useGLTF(pathToGLTF) as any;

  const allGeometriesAndMaterials = Object.values(usedgltf?.nodes)
    // geometry must exist
    .filter(({ geometry }) => Boolean(geometry));

  // * each instance must have only one geometry https://github.com/pmndrs/react-three-fiber/issues/574#issuecomment-703296449
  const [active, setActive] = useState(false);
  const scaleActual = (active ? 2 : 1) * scale;
  const springProps = useSpring({
    scale: [scaleActual, scaleActual, scaleActual],
  });
  const randPos = useMemo(() => getRandPosition(worldRadius), [worldRadius]);
  return (
    <mesh position={randPos}>
      {allGeometriesAndMaterials.map(
        ({ geometry, material, position }, idx) => (
          <a.instancedMesh
            ref={ref}
            castShadow={true}
            key={idx}
            onPointerOver={() => {
              setActive(true);
            }}
            onPointerOut={() => {
              setActive(false);
            }}
            args={[geometry, material, Math.ceil(numParticles)]}
            renderOrder={2}
            scale={springProps.scale}
            position={position}
          >
            <primitive object={usedgltf.scene} attach="geometry" />
            <primitive object={material} attach="material" />
            {/* <instancedBufferGeometry
						attach="geometry"
						// args={[null, null, null]}
					></instancedBufferGeometry>
					<instancedBufferAttribute
						attachObject={["attributes", "geometry"]}
						attach="geometry"
						args={[null, null, null]}
					/> */}
            {/* <ChildParticle attach="geometry" /> */}
          </a.instancedMesh>
        )
      )}
    </mesh>
  );
};

export default InstancedParticle;
