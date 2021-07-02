/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "../../../utils/useGltf";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF(
    "/models/nanotech/co_assembling_protein_dna_nanowires_13_draco.glb"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-35.42, -69.03, -33.19]}>
        <mesh
          material={nodes["4qtrcif_A_SES_surface"].material}
          geometry={nodes["4qtrcif_A_SES_surface"].geometry}
        />
        <mesh
          material={nodes["4qtrcif_B_SES_surface"].material}
          geometry={nodes["4qtrcif_B_SES_surface"].geometry}
        />
        <mesh
          material={nodes["4qtrcif_C_SES_surface"].material}
          geometry={nodes["4qtrcif_C_SES_surface"].geometry}
        />
        <mesh
          material={nodes["4qtrcif_D_SES_surface"].material}
          geometry={nodes["4qtrcif_D_SES_surface"].geometry}
        />
        <mesh
          material={nodes["4qtrcif_E_SES_surface"].material}
          geometry={nodes["4qtrcif_E_SES_surface"].geometry}
        />
        <mesh
          material={nodes["4qtrcif_F_SES_surface"].material}
          geometry={nodes["4qtrcif_F_SES_surface"].geometry}
        />
        <mesh
          material={nodes["4qtrcif_G_SES_surface"].material}
          geometry={nodes["4qtrcif_G_SES_surface"].geometry}
        />
        <mesh
          material={nodes["4qtrcif_H_SES_surface"].material}
          geometry={nodes["4qtrcif_H_SES_surface"].geometry}
        />
      </group>
    </group>
  );
}

// useGLTF.preload(
//   "/models/nanotech/co_assembling_protein_dna_nanowires_13_draco.glb"
// );
