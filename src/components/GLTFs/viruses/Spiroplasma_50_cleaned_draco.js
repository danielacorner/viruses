/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/models/viruses/Spiroplasma_50_cleaned_draco.glb"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Spiroplasma_viruscif_assembly_1_A_SES_surface.geometry}
        material={materials["default"]}
      />
    </group>
  );
}

useGLTF.preload("/models/viruses/Spiroplasma_50_cleaned_draco.glb");
