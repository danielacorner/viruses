import React, { useMemo, useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useSpring, a } from "react-spring/three";
import {
	useJitterInstanceParticle,
	useJitterParticle,
} from "./useJitterParticle";
import { useFrame, useLoader } from "react-three-fiber";
import * as THREE from "three";
// https://discourse.threejs.org/t/there-is-no-gltfloader-in-three-module/16117/4
import { useMount } from "../../utils/utils";
import { useGLTF } from "@react-three/drei";
import { getRandStartPosition } from "./particleUtils";
import { useStore } from "../../store";
// import * as antibody from "./models/1bv1/scene.gltf";

const dummy = new THREE.Object3D();

const rpi = () => Math.random() * Math.PI;

const InstancedParticle = ({
	ChildParticle,
	scale,
	temperature,
	numParticles,
	pathToGLTF,
	jittery,
	...rest
}) => {
	const worldRadius = useStore((state) => state.worldRadius);

	// https://codesandbox.io/s/may-with-60fps-your-web-site-run-xj31x?from-embed=&file=/src/index.js:297-1112

	const [ref, sphereApi] = useSphere((index) => ({
		// rotation: [-Math.PI / 2, 0, 0],
		mass: 1,
		position: getRandStartPosition(worldRadius),
		args: 1, // ? https://codesandbox.io/s/r3f-cannon-instanced-physics-devf8?file=/src/index.js
	}));

	useJitterInstanceParticle({
		jitterPosition: !jittery ? 0 : temperature,
		jitterRotation: !jittery ? 0 : temperature,
		numParticles,
		ref,
	});

	const usedgltf = useGLTF(pathToGLTF) as any;
	console.log("🌟🚨 ~ usedgltf", usedgltf);

	const allGeometriesAndMaterials = Object.values(usedgltf?.nodes)
		// geometry must exist
		.filter(({ geometry }) => Boolean(geometry));
	console.log("🌟🚨 ~ allGeometriesAndMaterials", allGeometriesAndMaterials);

	// * each instance must have only one geometry https://github.com/pmndrs/react-three-fiber/issues/574#issuecomment-703296449
	const [active, setActive] = useState(false);
	const scaleActual = (active ? 2 : 1) * scale;
	const springProps = useSpring({
		scale: [scaleActual, scaleActual, scaleActual],
	});
	const randPos = useMemo(() => getRandStartPosition(worldRadius), [
		worldRadius,
	]);
	return (
		<mesh position={randPos}>
			{allGeometriesAndMaterials.map(
				({ geometry, material, position }, idx) => (
					<a.instancedMesh
						castShadow
						key={idx}
						ref={ref}
						onPointerOver={() => {
							setActive(true);
						}}
						onPointerOut={() => {
							setActive(false);
						}}
						args={[geometry, material, Math.ceil(numParticles)]}
						renderOrder={2}
						scale={springProps.scale}
						position={position}
					>
						<primitive object={usedgltf.scene}></primitive>
						<primitive object={geometry} attach="geometry"></primitive>
						<primitive object={material} attach="material"></primitive>
						{/* <instancedBufferGeometry
						attach="geometry"
						// args={[null, null, null]}
					></instancedBufferGeometry>
					<instancedBufferAttribute
						attachObject={["attributes", "geometry"]}
						attach="geometry"
						args={[null, null, null]}
					/> */}
						{/* <ChildParticle attach="geometry" /> */}
					</a.instancedMesh>
				)
			)}
		</mesh>
	);
	// <instancedMesh
	//   ref={mesh}
	//   args={[null, null, numParticles]}
	//   renderOrder={2}
	//   // onPointerMove={(e) => setHovered(e.instanceId)}
	//   // onPointerOut={(e) => setHovered(undefined)}
	// >
	//   {/* <Suspense fallback={null}>
	//     <ChildParticle scale={[scale, scale, scale]} />
	//   </Suspense> */}
	//   <boxBufferGeometry attach="geometry" />
	//   <meshNormalMaterial attach="material" transparent opacity={1} />
	// </instancedMesh>
};

export default InstancedParticle;
