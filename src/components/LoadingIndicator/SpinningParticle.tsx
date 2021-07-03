import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScalePercent } from "../useScalePercent";
import {
  SPEED_Y,
  AMPLITUDE_Y,
  SPEED_X,
  AMPLITUDE_X_INV,
} from "./LoadingIndicator";
import { useSpring, animated } from "@react-spring/three";
import { COMMON_MATERIAL_PROPS } from "../../utils/constants";

export function SpinningParticle() {
  const scalePct = useScalePercent();

  const refConstant = useRef(null as any);
  const ref1 = useRef(null as any);
  const ref2 = useRef(null as any);
  const ref3 = useRef(null as any);
  const ref4 = useRef(null as any);
  const ref5 = useRef(null as any);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (!ref1.current) {
      return;
    }

    // (time-based sine curve)
    refConstant.current.rotation.x = Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    refConstant.current.rotation.y =
      refConstant.current.rotation.y +
      Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref1.current.rotation.x = -Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref1.current.rotation.y =
      ref1.current.rotation.y + Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref2.current.rotation.x = Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref2.current.rotation.y =
      ref2.current.rotation.y - Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref3.current.rotation.x = Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref3.current.rotation.y =
      ref3.current.rotation.y + Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref4.current.rotation.x = -Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref4.current.rotation.y =
      ref4.current.rotation.y - Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;

    ref5.current.rotation.x = -Math.sin(time * SPEED_Y) * AMPLITUDE_Y;
    ref5.current.rotation.y =
      ref5.current.rotation.y + Math.cos(time * SPEED_X) * AMPLITUDE_X_INV;
  });
  return (
    <>
      {/* constant-size particle */}
      <mesh ref={refConstant}>
        <icosahedronBufferGeometry args={[1, 0]} />
        <animated.meshPhysicalMaterial
          {...COMMON_MATERIAL_PROPS}
          opacity={0.5}
          roughness={0.4}
          metalness={0.9}
        />
      </mesh>
      {/* other particles scale with scalePct */}
      <mesh ref={ref1}>
        <tetrahedronBufferGeometry args={[scalePct * 0.25, 0]} />
        <meshPhysicalMaterial
          opacity={0.5}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh ref={ref2}>
        <octahedronBufferGeometry args={[scalePct * 0.5, 0]} />
        <meshPhysicalMaterial
          opacity={0.4}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh ref={ref3}>
        <icosahedronBufferGeometry args={[scalePct * 1, 0]} />
        <meshPhysicalMaterial
          // wireframe={true}
          opacity={0.4}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh ref={ref4}>
        <icosahedronBufferGeometry args={[scalePct * 4, 1]} />
        <meshPhysicalMaterial
          color="tomato"
          // wireframe={true}
          opacity={0.08}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh ref={ref5}>
        <icosahedronBufferGeometry args={[scalePct * 14, 2]} />
        <meshPhysicalMaterial
          opacity={0.04}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
        />
      </mesh>
      <mesh>
        <icosahedronBufferGeometry args={[scalePct * 100, 5]} />
        <meshPhysicalMaterial
          color="rebeccapurple"
          opacity={0.018}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
          wireframe={true}
        />
      </mesh>
      <mesh>
        <icosahedronBufferGeometry args={[scalePct * 600, 10]} />
        <meshPhysicalMaterial
          color="cornflowerblue"
          opacity={0.01}
          transparent={true}
          depthTest={false}
          flatShading={true}
          roughness={0.4}
          vertexColors={true}
          reflectivity={1}
          wireframe={true}
        />
      </mesh>
    </>
  );
}
