/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "../../../utils/useGltf";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF(
    "/models/nanotech/color_device_state_a_10_draco.glb"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes["5i36cif_A_SES_surface"].material}
        geometry={nodes["5i36cif_A_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5i36cif_B_SES_surface"].material}
        geometry={nodes["5i36cif_B_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5i36cif_C_SES_surface"].material}
        geometry={nodes["5i36cif_C_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5i36cif_D_SES_surface"].material}
        geometry={nodes["5i36cif_D_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5i36cif_E_SES_surface"].material}
        geometry={nodes["5i36cif_E_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5i36cif_F_SES_surface"].material}
        geometry={nodes["5i36cif_F_SES_surface"].geometry}
      />
      <mesh
        material={nodes["5i36cif_G_SES_surface"].material}
        geometry={nodes["5i36cif_G_SES_surface"].geometry}
      />
    </group>
  );
}

// useGLTF.preload("/models/nanotech/color_device_state_a_10_draco.glb");
