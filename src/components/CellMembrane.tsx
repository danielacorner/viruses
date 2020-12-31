import React from "react";
import { Plane } from "./Shapes/Plane";
import { useStore } from "../store";
import { useGLTF } from "@react-three/drei";
const scale = 0.2;
const CellMembrane = () => {
	const worldRadius = useStore((state) => state.worldRadius);
	const { scene } = useGLTF("/models/plasma_membrane/scene.gltf");
	return (
		<group
			{...{
				position: [0, -worldRadius, 0],
			}}
		>
			<Plane
				{...{
					rotation: [-0.5 * Math.PI, 0, 0],
					color: "none",
				}}
				width={worldRadius * 2}
				height={worldRadius * 2}
			/>
			<primitive object={scene} scale={[scale, scale, scale]} />
		</group>
	);
};

export default CellMembrane;
