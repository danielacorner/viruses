import React from "react";
import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { getRandStartPosition } from "./particleUtils";
import { useStore } from "../../store";

export function SingleParticle({
	ChildParticle,
	scale,
	position,
	temperature,
	pathToGLTF,
	jittery,
}) {
	const worldRadius = useStore((state) => state.worldRadius);
	const usedgltf = useGLTF(pathToGLTF) as any;

	const [ref] = useSphere(() => ({
		mass: 1,
		position,
		args: 1,
	}));

	return (
		<mesh ref={ref} scale={[scale, scale, scale]}>
			<ChildParticle />
		</mesh>
	);
}
