import { Scene, Matrix4 } from "three";
import React, { useRef, useMemo } from "react";
import { useFrame, useThree, createPortal, Vector3 } from "react-three-fiber";
import { OrthographicCamera, useCamera } from "@react-three/drei";

/** displays a set of 3d components in a fixed position based on Viewcube https://codesandbox.io/s/react-three-fiber-viewcube-py4db */
const HUD = ({ children, position }) => {
  const { gl, scene, camera, size } = useThree();
  const virtualScene = useMemo(() => new Scene(), []);
  const virtualCam = useRef();
  const ref = useRef(null as any);
  const matrix = new Matrix4();

  useFrame(() => {
    matrix.copy(camera.matrix).invert();
    ref.current?.quaternion.setFromRotationMatrix(matrix);
    gl.autoClear = true;
    gl.render(scene, camera);
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(virtualScene, virtualCam.current);
  }, 1);

  const meshPosition: Vector3 = [0, -size.height / 2 + 80, -size.width / 2];

  return createPortal(
    <>
      <OrthographicCamera
        ref={virtualCam}
        makeDefault={false}
        position={position}
      />
      <mesh
        ref={ref}
        raycast={useCamera(virtualCam)}
        position={meshPosition}
        scale={[70, 70, 70]}
        renderOrder={2}
      >
        {children}
      </mesh>
      <pointLight
        position={[meshPosition[0], meshPosition[1], 400]}
        intensity={2}
      />
    </>,
    virtualScene
  ) as any;
};

export default HUD;
