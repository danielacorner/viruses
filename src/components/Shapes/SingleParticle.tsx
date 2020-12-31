import React, { useRef } from "react";
import { useSphere } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";

export function SingleParticle({
	ChildParticle,
	scale,
	position,
	mass,
	temperature,
	interactive,
}) {
	// TODO: make NonInteractiveParticle instanced for better performance?
	// TODO: make InteractiveParticle instanced for better performance?
	const Particle = interactive ? InteractiveParticle : NonInteractiveParticle;
	return (
		<Particle
			{...{
				temperature,
				mass,
				position,
				scale,
				ChildParticle,
			}}
		/>
	);
}

/** interacts with other particles using @react-three/cannon */
function InteractiveParticle({
	temperature,
	position,
	scale,
	ChildParticle,
	mass,
}) {
	const [ref] = useSphere(() => ({
		mass,
		position,
		args: 1,
	}));
	useJitterParticle({
		temperature,
		mass,
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
	temperature,
	mass,
	position,
	scale,
	ChildParticle,
}) {
	const ref = useRef();
	useJitterParticle({
		temperature,
		mass,
		ref,
	});

	return (
		<mesh ref={ref} scale={[scale, scale, scale]} position={position}>
			<ChildParticle />
		</mesh>
	);
}
