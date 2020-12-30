import React, { useEffect, useMemo, useState } from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { Walls } from "./Walls";
import Particle from "./Shapes/Particle";
import InstancedParticle from "./Shapes/InstancedParticle";
import { SingleParticle } from "./Shapes/SingleParticle";
import ModelActivatorProtein from "./GLTFs/activator_protein-1";
import SarsCov2 from "./GLTFs/SarsCov2";
import Model1bv1 from "./GLTFs/1bv1";
import ModelAntibody from "./GLTFs/antibody";
import { Stars as ManualStars } from "./Stars";
import { getRandStartPosition } from "./Shapes/particleUtils";
import { useStore } from "../store";

const Protein = ({
	particle,
	scale,
	pathToGLTF,
	numParticles,
	temperature,
}) => {
	const worldRadius = useStore((state) => state.worldRadius);

	const [positionsArray, setPositionsArray] = useState(() =>
		[...new Array(numParticles)].map(() => getRandStartPosition(worldRadius))
	);
	console.log("🌟🚨: positionsArray", positionsArray);

	// change the positions array when numParticles changes,
	// do this manually so that existing particles don't re-render & maintain their positions
	useEffect(() => {
		const numNewParticles = numParticles - positionsArray.length;
		console.log("🌟🚨: numNewParticles", numNewParticles);
		if (numNewParticles < 0) {
			// slice off any excess,
			const newPositionsArray = positionsArray
				.slice(0, numParticles)
				.filter(Boolean);
			setPositionsArray(newPositionsArray);
		} else if (numNewParticles > 0) {
			// or populate any missing
			const newPositionsArray = [...new Array(numNewParticles)].map(() =>
				getRandStartPosition(worldRadius)
			);
			console.log("🌟🚨: newPositionsArray", newPositionsArray);
			setPositionsArray((prev) => [...prev, ...newPositionsArray]);
		}
	}, [numParticles]);

	return (
		<>
			{positionsArray.map((position) => (
				<SingleParticle
					key={JSON.stringify(position)}
					{...{
						position,
						jittery: true,
						ChildParticle: particle,
						// positionsArray: positionsArrays[idx],
						temperature,
						pathToGLTF,
						scale,
					}}
				/>
			))}
		</>
	);
};

export default Protein;
