import React, { useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";

export function SingleParticle({
	ChildParticle,
	scale,
	position,
	temperature,
	interactive,
	jittery,
}) {
	// TODO: make NonInteractiveParticle instanced for better performance?
	// TODO: make InteractiveParticle instanced for better performance?
	const Particle = interactive ? InteractiveParticle : NonInteractiveParticle;
	return (
		<Particle
			{...{
				jittery,
				temperature,
				position,
				scale,
				ChildParticle,
			}}
		/>
	);
}

/** interacts with other particles using @react-three/cannon */
function InteractiveParticle({
	jittery,
	temperature,
	position,
	scale,
	ChildParticle,
}) {
	const [ref] = useSphere(() => ({
		mass: 1,
		position,
		args: 1,
	}));
	useJitterParticle({
		jitterPosition: !jittery ? 0 : temperature,
		jitterRotation: !jittery ? 0 : temperature * (2 * Math.PI) ** 2,
		ref,
	});

	return (
		<mesh ref={ref} scale={[scale, scale, scale]}>
			<ChildParticle />
		</mesh>
	);
}

/** doesn't interact with other particles (passes through them) */
function NonInteractiveParticle({
	jittery,
	temperature,
	position,
	scale,
	ChildParticle,
}) {
	const ref = useRef();
	useJitterParticle({
		jitterPosition: !jittery ? 0 : temperature,
		jitterRotation: !jittery ? 0 : temperature * (2 * Math.PI) ** 2,
		ref,
	});

	return (
		<mesh ref={ref} scale={[scale, scale, scale]} position={position}>
			<ChildParticle />
		</mesh>
	);
}
