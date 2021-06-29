/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Vikrama Raghuraman (https://sketchfab.com/vikrama1998)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/basophil-1f785fd1586f493196c38d048f0af0d6
title: Basophil
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/cells/basophil.gltf") as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-3.01, 0.56, 0]}
            rotation={[0, 0, -1.76]}
            scale={[2.04, 2.04, 2.04]}
          >
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_0.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_1.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_2.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_3.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_4.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_5.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_6.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_7.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_8.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_9.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_10.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_11.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_12.geometry}
            />
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_13.geometry}
            />
          </group>
          <group scale={[6.13, 6.13, 6.13]}>
            <mesh
              material={materials["Material.002"]}
              geometry={nodes.mesh_14.geometry}
            />
            <mesh
              material={materials["Material.002"]}
              geometry={nodes.mesh_15.geometry}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload("/models/cells/basophil.gltf");
