import React from "react";
import { usePlane } from "@react-three/cannon";

export function Plane({
	width = 100,
	height = 100,
	widthSegments = 1,
	heightSegments = 1,
	color,
	...rest
}) {
	const [ref] = usePlane(() => ({
		// rotation: [-Math.PI / 2, 0, 0],
		...rest,
		// position: [-100, -100, -100],
	}));
	return (
		<mesh ref={ref} receiveShadow>
			<planeGeometry
				attach="geometry"
				args={[width, height, widthSegments, heightSegments]}
			/>
			<meshStandardMaterial
				attach="material"
				color={color}
				// roughness={0.7}
				// metalness={0.5}
				opacity={0.5}
				depthTest={false}
			/>
		</mesh>
	);
}
