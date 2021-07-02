/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Vikrama Raghuraman (https://sketchfab.com/vikrama1998)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/monocyte-884b7004a3664e429d85010cf5faafb5
title: Monocyte
*/

import React, { useRef } from "react";
import { useGLTF } from "../../../utils/useGltf";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/cells/monocyte.gltf") as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={[3.04, 3.04, 3.04]}>
            <mesh
              material={materials["Material.002"]}
              geometry={nodes.mesh_0.geometry}
            />
            <mesh
              material={materials["Material.002"]}
              geometry={nodes.mesh_1.geometry}
            />
          </group>
          <group position={[-0.06, 0.1, 0]} scale={[2.9, 2.9, 2.9]}>
            <mesh
              material={materials["Material.001"]}
              geometry={nodes.mesh_2.geometry}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

// useGLTF.preload("/models/cells/monocyte.gltf");
