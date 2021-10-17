/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/models/nanotech/icosahedral_nanoparticle_20_cleaned_draco.glb"
  );
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={
          nodes.icosahedral_nanoparticlecif_assembly_1_A_Gaussian_surface
            .geometry
        }
        material={materials["default"]}
      />
    </group>
  );
}

useGLTF.preload(
  "/models/nanotech/icosahedral_nanoparticle_20_cleaned_draco.glb"
);