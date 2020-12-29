import React, { useEffect, useMemo, useState } from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { Walls } from "./Walls";
import Particle from "./Shapes/Particle";
import InstancedParticle from "./Shapes/InstancedParticle";
import ModelActivatorProtein from "./GLTFs/activator_protein-1";
import SarsCov2 from "./GLTFs/SarsCov2";
import Model1bv1 from "./GLTFs/1bv1";
import ModelAntibody from "./GLTFs/antibody";
import { Stars } from "./Stars";
import { getRandStartPosition } from "./Shapes/particleUtils";
import { useStore } from "../store";

const PROTEINS = [
	{
		particle: SarsCov2,
		scale: 0.005,
		instanced: false,
		pathToGLTF: "/models/SarsCov2/scene.gltf",
	},
	{
		particle: Model1bv1,
		scale: 0.005,
		instanced: false,
		pathToGLTF: "/models/1bv1/scene.gltf",
	},
	{
		particle: ModelActivatorProtein,
		scale: 0.005,
		instanced: false,
		pathToGLTF: "/models/activator_protein-1/scene.gltf",
	},
	{
		particle: ModelAntibody,
		scale: 0.005,
		instanced: false,
		pathToGLTF: "/models/antibody/scene.gltf",
	},
];

const Scene = () => {
	const numParticles: number = useControl("particles", {
		type: "number",
		min: 1,
		max: 100,
		value: 2,
	});
	const temperature: number = useControl("temperature", {
		type: "number",
		min: 0,
		max: 0.04,
		value: 0.01,
	});
	const numParticlesCeil = Math.ceil(numParticles);
	const worldRadius = useStore((state) => state.worldRadius);
	console.log("🌟🚨: Scene -> worldRadius", worldRadius);
	const [positionsArray, setPositionsArray] = useState(
		[...new Array(numParticlesCeil)].map(() =>
			getRandStartPosition(-worldRadius, worldRadius)
		)
	);
	// update positionsArray when numParticles changes manually, to avoid re-rendering all particles
	useEffect(() => {
		const newPositionsArr = positionsArray
			.slice(0, numParticlesCeil)
			.filter(Boolean);
		console.log("🌟🚨 ~ useEffect ~ newPositionsArr", newPositionsArr);
		if (newPositionsArr.length !== positionsArray.length) {
			setPositionsArray(newPositionsArr);
		}
	}, [numParticlesCeil, setPositionsArray, positionsArray]);
	return (
		<>
			<OrbitControls />
			<Lighting />
			<Physics
				// iterations={20}
				// tolerance={0.0001}
				// defaultContactMaterial={{
				//   friction: 0.9,
				//   restitution: 0.7,
				//   contactEquationStiffness: 1e7,
				//   contactEquationRelaxation: 1,
				//   frictionEquationStiffness: 1e7,
				//   frictionEquationRelaxation: 2,
				// }}
				gravity={[0, 0, 0]}
				// allowSleep={false}
			>
				{PROTEINS.map(({ particle, scale, instanced, pathToGLTF }, idx) => {
					// * instanced particles
					// * -> replicate up to 1000 times
					// * -> we can only control their movements algorithmically e.g. useFrame
					// * -> each instance must specify one Geometry (e.g. const geometry = useGLTF("/models/SarsCov2/scene.gltf")?.nodes?.["RNA__SARS-CoV-2_0"]?.geometry )
					// *
					// * non-instanced particles
					// * -> replicate up to 200 times
					// * -> can interact with useSphere, useBox, usePlane etc
					return (
						<InstancedParticle
							key={idx}
							{...{
								instanced: false,
								numParticles: numParticlesCeil,
								jittery: true,
								ChildParticle: particle,
								// positionsArray: positionsArrays[idx],
								temperature,
								pathToGLTF,
								scale,
							}}
						/>
					);
				})}
				<Walls />
				<Stars />
				<fog
					attach="fog"
					// args={["white", worldRadius, worldRadius * 3]} /* color, start, end */
				/>
			</Physics>
			{/* <Effects /> */}
		</>
	);
};

PROTEINS.forEach(({ pathToGLTF }) => useGLTF.preload(pathToGLTF));

// instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
// <instancedMesh args={[geometry, material, count]}>

export default Scene;
