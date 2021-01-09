import React from "react";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Lighting } from "./components/Lighting";
import { Physics } from "@react-three/cannon";
import { Water } from "./components/Water";
import { PHYSICS_PROPS } from "./utils/PHYSICS_PROPS";
import { Walls } from "./components/Walls";

export function CanvasAndSceneEmpty() {
	const windowSize = useWindowSize();

	return (
		<Canvas
			onCreated={({ gl }) => {
				gl.shadowMap.enabled = true;
				gl.shadowMap.type = THREE.PCFShadowMap;
			}}
			gl={{ antialias: false, alpha: false }}
			style={{ height: windowSize.height, width: windowSize.width }}
		>
			<>
				<OrbitControls />
				<Lighting />
				<Physics {...PHYSICS_PROPS}>
					<Water />
					<Walls />
				</Physics>
			</>
		</Canvas>
	);
}
