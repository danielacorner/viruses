/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF(
    "/models/nanotech/3d_crystals_containing_a_torsionally_stressed_component_20.glb"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes["5eoscif_1_A_SES_surface"].material}
        geometry={nodes["5eoscif_1_A_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_1_D_SES_surface"].material}
        geometry={nodes["5eoscif_1_D_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_1_B_SES_surface"].material}
        geometry={nodes["5eoscif_1_B_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_1_C_SES_surface"].material}
        geometry={nodes["5eoscif_1_C_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_2_A_SES_surface"].material}
        geometry={nodes["5eoscif_2_A_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_2_D_SES_surface"].material}
        geometry={nodes["5eoscif_2_D_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_2_B_SES_surface"].material}
        geometry={nodes["5eoscif_2_B_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_2_C_SES_surface"].material}
        geometry={nodes["5eoscif_2_C_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_3_A_SES_surface"].material}
        geometry={nodes["5eoscif_3_A_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_3_D_SES_surface"].material}
        geometry={nodes["5eoscif_3_D_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_3_B_SES_surface"].material}
        geometry={nodes["5eoscif_3_B_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5eoscif_3_C_SES_surface"].material}
        geometry={nodes["5eoscif_3_C_SES_surface"].geometry}
      />
    </group>
  );
}

useGLTF.preload(
  "/models/nanotech/3d_crystals_containing_a_torsionally_stressed_component_20.glb"
);
