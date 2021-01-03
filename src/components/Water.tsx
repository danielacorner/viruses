import React from "react";
import { useSphere } from "@react-three/cannon";
import * as THREE from "three";
import { getRandStartPosition } from "./Shapes/particleUtils";
import { useStore } from "../store";
const RADIUS = 0.05;

export function Water() {
	const worldRadius = useStore(({ worldRadius }) => worldRadius);
	const [ref] = useSphere((index) => ({
		mass: 18.0153 / 1000 /* 18.0153 daltons */,
		position: getRandStartPosition(worldRadius),
		args: 1,
	}));
	// const scale = useStore(({ scale }) => scale * 500);

	return (
		<instancedMesh
			ref={ref}
			receiveShadow
			args={[null, null, 50]}
			renderOrder={2}
		>
			<sphereBufferGeometry args={[RADIUS, 8, 8]} />
			<meshStandardMaterial
				color={new THREE.Color("#6f6dda")}
				transparent={true}
				opacity={0.3}
			/>
		</instancedMesh>
	);
}
