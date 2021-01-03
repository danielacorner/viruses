import React, { useMemo, useRef } from "react";
import { useConvexPolyhedron, useSphere } from "@react-three/cannon";
import { useJitterParticle } from "./useJitterParticle";
import { useStore } from "../../store";
import * as THREE from "three";

export function SingleParticle({
	ChildParticle,
	position,
	numIcosahedronFaces,
	pathToImage,
	atomCount,
	mass,
	name,
	PDBUrl,
	interactive,
	pathToGLTF,
}) {
	// TODO: make NonInteractiveParticle instanced for better performance?
	// TODO: make InteractiveParticle instanced for better performance?
	const Particle = interactive ? InteractiveParticle : NonInteractiveParticle;
	return (
		<Particle
			{...{
				mass,
				PDBUrl,
				position,
				atomCount,
				numIcosahedronFaces,
				pathToImage,
				name,
				ChildParticle,
				pathToGLTF,
			}}
		/>
	);
}
/** interacts with other particles using @react-three/cannon */
function InteractiveParticle({
	pathToGLTF,
	position,
	atomCount,
	PDBUrl,
	ChildParticle,
	pathToImage,
	name,
	mass,
	numIcosahedronFaces,
}) {
	// TODO:
	// const temperature=useStore(state=>state.temperature)

	// https://codesandbox.io/s/r3f-convex-polyhedron-cnm0s?from-embed=&file=/src/index.js:1639-1642

	const detail = Math.ceil(numIcosahedronFaces / 20);
	const [ref] = useConvexPolyhedron(() => ({
		mass,
		position,
		// https://threejs.org/docs/scenes/geometry-browser.html#IcosahedronBufferGeometry
		args: new THREE.IcosahedronGeometry(1, detail),
	}));
	useJitterParticle({
		mass,
		ref,
	});
	const scale = useStore((state) => state.scale);
	const set = useStore((state) => state.set);

	return (
		<mesh
			ref={ref}
			scale={[scale, scale, scale]}
			onPointerOver={() =>
				set({ selectedProtein: { pathToImage, name, PDBUrl, mass, atomCount } })
			}
			// onPointerDown={() => set({ selectedProtein: { pathToImage } })}
		>
			<ChildParticle />
		</mesh>
	);
}

/** doesn't interact with other particles (passes through them) */
function NonInteractiveParticle({
	pathToGLTF,
	mass,
	position,
	ChildParticle,
	numIcosahedronFaces,
	pathToImage,
}) {
	const ref = useRef();
	useJitterParticle({
		mass,
		ref,
	});
	const scale = useStore((state) => state.scale);

	return (
		<mesh
			renderOrder={3}
			ref={ref}
			scale={[scale, scale, scale]}
			position={position}
		>
			<ChildParticle />
		</mesh>
	);
}
