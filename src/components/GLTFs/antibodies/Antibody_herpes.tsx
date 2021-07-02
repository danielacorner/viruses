/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "../../../utils/useGltf";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF(
    "/models/antibodies/antibody_herpes_draco.glb"
  ) as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes["3w9ecif_C_SES_surface"].material}
        geometry={nodes["3w9ecif_C_SES_surface"].geometry}
      />
      <mesh
        material={nodes["3w9ecif_A_SES_surface"].material}
        geometry={nodes["3w9ecif_A_SES_surface"].geometry}
      />
      <mesh
        material={nodes["3w9ecif_B_SES_surface"].material}
        geometry={nodes["3w9ecif_B_SES_surface"].geometry}
      />
    </group>
  );
}

// useGLTF.preload("/models/antibodies/antibody_herpes_draco.glb");
