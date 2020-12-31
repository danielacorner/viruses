import React from "react";
import { Plane } from "./Shapes/Plane";
import { useStore } from "../store";
import { useGLTF } from "@react-three/drei";
import { useControl } from "react-three-gui";
const CellMembrane = () => {
	const worldRadius = useStore((state) => state.worldRadius);
	const { scene } = useGLTF("/models/plasma_membrane/scene.gltf");
	const scale = 0.2;
	// const scale = useControl("scale", {
	// 	type: "number",
	// 	min: 0,
	// 	max: 1,
	// 	value: 0.2,
	// });
	return (
		<group
			{...{
				position: [0, -worldRadius, 0],
			}}
		>
			<Plane
				{...{
					rotation: [-0.5 * Math.PI, 0, 0],
					color: "black",
				}}
				width={worldRadius * 2}
				height={worldRadius * 2}
			/>
			<primitive
				object={scene}
				scale={[scale, scale, scale]}
				position={[
					-worldRadius * scale * 5,
					-worldRadius * scale,
					-worldRadius * scale,
				]}
			/>
		</group>
	);
};

export default CellMembrane;
