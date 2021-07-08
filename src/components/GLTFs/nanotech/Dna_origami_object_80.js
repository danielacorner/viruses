/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "../../../utils/useGltf";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/models/nanotech/dna_origami_object_80_draco.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-310.76, -318.26, -306.35]}>
        {Object.values(nodes).map(({ material, geometry }, idx) =>
          idx % 3 === 0 ? <mesh key={idx} {...{ material, geometry }} /> : null
        )}
      </group>
    </group>
  );
}

// useGLTF.preload("/models/nanotech/dna_origami_object_80_draco.glb");
