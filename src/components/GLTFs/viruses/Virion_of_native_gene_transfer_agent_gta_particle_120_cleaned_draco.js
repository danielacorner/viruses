/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/models/viruses/virion_of_native_gene_transfer_agent_gta_particle_120_cleaned_draco.glb"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes["6tbacif_1A_Gaussian_surface"].geometry}
        material={materials["default"]}
      />
    </group>
  );
}

useGLTF.preload(
  "/models/viruses/virion_of_native_gene_transfer_agent_gta_particle_120_cleaned_draco.glb"
);
