import { useStore } from "../store";
import { Scene, Matrix4 } from "three";
import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree, createPortal } from "react-three-fiber";
import {
  OrbitControls,
  OrthographicCamera,
  useCamera,
  useGLTF,
} from "@react-three/drei";
import { useMultiplier } from "./useMultiplier";
import { useControl } from "react-three-gui";

// export function SelectedParticleDisplay() {
//   const selectedProtein = useStore((s) => s.selectedProtein);
//   const selectedGltf = useGLTF(selectedProtein?.pathToGLTF);
//   const scale = useStore((s) => s.scale);
//   const ref = useRef(null as any);
//   // const camera = useCamera()
//   // useFrame(({ camera }) => {
//   //   if (ref.current?.position) {
//   //     // ref.current.position = [
//   //     //   camera.position.x,
//   //     //   camera.position.y,
//   //     //   camera.position.z - 2,
//   //     // ];
//   //   }
//   // });
//   return (
//     <primitive
//       ref={ref}
//       scale={[scale, scale, scale]}
//       position={[]}
//       object={selectedGltf.scene}
//     />
//   );
// }

/** based on Viewcube https://codesandbox.io/s/react-three-fiber-viewcube-py4db */
export function SelectedParticleDisplay() {
  const selectedProtein = useStore((s) => s.selectedProtein);
  // const selectedGltf = useGLTF(selectedProtein?.pathToGLTF);
  const scale = useStore((s) => s.scale) * 50;

  const { gl, scene, camera, size } = useThree();
  const virtualScene = useMemo(() => new Scene(), []);
  const virtualCam = useRef();
  const ref = useRef(null as any);
  const [hover, set] = useState(null);
  const matrix = new Matrix4();

  useFrame(() => {
    matrix.getInverse(camera.matrix);
    ref.current?.quaternion.setFromRotationMatrix(matrix);
    gl.autoClear = true;
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(virtualScene, virtualCam.current);
  }, 1);
  const Component = selectedProtein?.Component || (() => <mesh />);
  const mult = useControl("mult", {
    type: "number",
    min: 0,
    max: 5,
    value: 1,
  });
  return createPortal(
    <>
      <OrthographicCamera
        ref={virtualCam}
        makeDefault={false}
        position={[0, 0, 100]}
      />
      <mesh
        ref={ref}
        raycast={useCamera(virtualCam)}
        position={[size.width / 2 - 80, size.height / 2 - 80, 0]}
        onPointerOut={(e) => set(null)}
        onPointerMove={(e) => set(Math.floor(e.faceIndex / 2))}
        scale={[scale, scale, scale]}
      >
        <Component />
      </mesh>
      {/* <ambientLight intensity={0.5} /> */}
      <pointLight
        position={[size.width / 2 - 80, size.height / 2 - 80, 400]}
        intensity={2}
      />
    </>,
    virtualScene
  ) as any;
}
