/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/models/nanotech/nanoparticle_COVID_19_vaccine_candidate_50_cleaned.glb"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes["7b3ycif_assembly_1_B_Gaussian_surface"].geometry}
        material={nodes["7b3ycif_assembly_1_B_Gaussian_surface"].material}
      />
    </group>
  );
}

// useGLTF.preload(
//   "/models/nanotech/nanoparticle_COVID_19_vaccine_candidate_50_cleaned.glb"
// );
