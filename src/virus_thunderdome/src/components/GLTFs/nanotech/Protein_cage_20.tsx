/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/models/nanotech/protein_cage_20.glb") as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes.protein_cagecif_assembly_1_A_Gaussian_surface.material}
        geometry={nodes.protein_cagecif_assembly_1_A_Gaussian_surface.geometry}
      />
      <mesh
        material={nodes.protein_cagecif_assembly_1_B_Gaussian_surface.material}
        geometry={nodes.protein_cagecif_assembly_1_B_Gaussian_surface.geometry}
      />
      <mesh
        material={nodes.protein_cagecif_assembly_1_C_Gaussian_surface.material}
        geometry={nodes.protein_cagecif_assembly_1_C_Gaussian_surface.geometry}
      />
    </group>
  );
}

// useGLTF.preload("/models/nanotech/protein_cage_20.glb");