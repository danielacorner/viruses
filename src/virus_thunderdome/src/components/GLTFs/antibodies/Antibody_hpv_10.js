/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "../../../utils/useGltf";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/models/antibodies/antibody_hpv_10.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-65.96, -51.5, -305.33]}>
        <mesh
          material={nodes["6bt3cif_G_Gaussian_surface"].material}
          geometry={nodes["6bt3cif_G_Gaussian_surface"].geometry}
          position={[0, 0, -2.28]}
        />
        <mesh
          material={nodes["6bt3cif_H_Gaussian_surface"].material}
          geometry={nodes["6bt3cif_H_Gaussian_surface"].geometry}
          position={[0, 0, -2.28]}
        />
      </group>
    </group>
  );
}

// useGLTF.preload("/models/antibodies/antibody_hpv_10.glb");
