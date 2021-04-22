/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/models/viruses/poliovirus_50_draco.glb") as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        material={nodes.polioviruscif_assembly_1_0_Gaussian_surface.material}
        geometry={nodes.polioviruscif_assembly_1_0_Gaussian_surface.geometry}
      />
      <mesh
        material={nodes.polioviruscif_assembly_1_1_Gaussian_surface.material}
        geometry={nodes.polioviruscif_assembly_1_1_Gaussian_surface.geometry}
      />
      <mesh
        material={nodes.polioviruscif_assembly_1_2_Gaussian_surface.material}
        geometry={nodes.polioviruscif_assembly_1_2_Gaussian_surface.geometry}
      />
      <mesh
        material={nodes.polioviruscif_assembly_1_3_Gaussian_surface.material}
        geometry={nodes.polioviruscif_assembly_1_3_Gaussian_surface.geometry}
      />
      <mesh
        material={nodes.polioviruscif_assembly_1_4_Gaussian_surface.material}
        geometry={nodes.polioviruscif_assembly_1_4_Gaussian_surface.geometry}
      />
    </group>
  );
}

// useGLTF.preload("/models/viruses/poliovirus_50_draco.glb");
