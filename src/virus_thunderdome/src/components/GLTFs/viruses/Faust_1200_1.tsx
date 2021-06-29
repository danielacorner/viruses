/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/models/viruses/faust_1200_1.glb") as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes["5j7vcif_assembly_1_A_Gaussian_surface"].material}
        geometry={nodes["5j7vcif_assembly_1_A_Gaussian_surface"].geometry}
      />
    </group>
  );
}

// useGLTF.preload("/models/viruses/faust_1200_1.glb");
