import { useStore } from "../../store";
import { Scene, Matrix4 } from "three";
import React, { useRef, useMemo } from "react";
import { useFrame, useThree, createPortal } from "@react-three/fiber";
import { OrthographicCamera, useCamera } from "@react-three/drei";

/** based on Viewcube https://codesandbox.io/s/react-three-fiber-viewcube-py4db */
export function SelectedParticleDisplay() {
  return null;
  // const selectedProtein = useStore((s) => s.selectedProtein);
  // // const selectedGltf = useGLTF(selectedProtein?.pathToGLTF);
  // const scale = useStore((s) => s.scale) * 50;

  // const { gl, scene, camera, size } = useThree();
  // const virtualScene = useMemo(() => new Scene(), []);
  // const virtualCam = useRef();
  // const ref = useRef(null as any);
  // const matrix = new Matrix4();

  // useFrame(() => {
  //   matrix.copy(camera.matrix).invert();
  //   ref.current?.quaternion.setFromRotationMatrix(matrix);
  //   gl.autoClear = true;
  //   gl.render(scene, camera);
  //   gl.autoClear = false;
  //   gl.clearDepth();
  //   gl.render(virtualScene, virtualCam.current);
  // }, 1);
  // const Component = selectedProtein?.Component || (() => <mesh />);

  // return createPortal(
  //   <>
  //     <OrthographicCamera
  //       ref={virtualCam}
  //       makeDefault={false}
  //       position={[0, 0, 100]}
  //     />
  //     <mesh
  //       ref={ref}
  //       raycast={useCamera(virtualCam)}
  //       position={[size.width / 2 - 80, size.height / 2 - 80, -size.width / 2]}
  //       scale={[scale, scale, scale]}
  //     >
  //       <Component />
  //     </mesh>
  //     <pointLight
  //       position={[size.width / 2 - 80, size.height / 2 - 80, 400]}
  //       intensity={2}
  //     />
  //   </>,
  //   virtualScene
  // ) as any;
}
