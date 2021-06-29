import React from "react";
import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const tempColor = new THREE.Color();
const scale = 0.005;
const numATPMolecules = 20;

export function ATPInstanced() {
  const [ref] = useSphere((index) => ({
    mass: 0.2,
    position: [Math.random() - 0.5, Math.random() - 0.5, index * 2],
    args: 1,
  }));
  const { nodes, materials } = useGLTF("/models/other/ATP.glb") as any;

  return (
    <instancedMesh
      ref={ref}
      receiveShadow
      args={[null, null, numATPMolecules]}
      renderOrder={2}
      material={materials[""]}
      scale={[scale, scale, scale]}
    >
      <bufferGeometry {...nodes.ATP___Gaussian_surface.geometry}>
        <instancedBufferAttribute
          attachObject={["attributes", "color"]}
          args={[Float32Array.from(tempColor.set("#b91515").toArray()), 1]}
        />
      </bufferGeometry>
    </instancedMesh>
  );
}
// useGLTF.preload("/models/other/ATP.glb");
