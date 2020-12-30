import React from "react";
import { useSphere } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { getRandStartPosition } from "./particleUtils";
import { useStore } from "../../store";
import { useJitterParticle } from "./useJitterParticle";

export function SingleParticle({
	ChildParticle,
	scale,
	position,
	temperature,
	pathToGLTF,
	jittery,
}) {
	const [ref] = useSphere(() => ({
		mass: 1,
		position,
		args: 1,
	}));
	useJitterParticle({
		jitterPosition: !jittery ? 0 : temperature,
		jitterRotation: !jittery ? 0 : temperature * Math.PI,
		ref,
	});
	return (
		<mesh ref={ref} scale={[scale, scale, scale]}>
			<ChildParticle />
		</mesh>
	);
}
