import React, { useEffect } from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { Walls } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { useMount } from "../utils/utils";
import useSound from "use-sound";
import music from "../assets/music";
import { PHYSICS_PROPS, PROTEINS } from "../utils/constants";
import CellMembrane from "./CellMembrane";

const Scene = () => {
	const temperature: number = useControl("temperature", {
		group: "Environment",
		type: "number",
		min: 0,
		max: 100,
		value: 1,
	});

	// audio track
	useAudioTrack();

	return (
		<>
			<OrbitControls />
			<Lighting />
			<Physics
				// iterations={20}
				// tolerance={0.0001}
				// allowSleep={false}
				{...PHYSICS_PROPS}
			>
				{PROTEINS.map(
					({ particle, scale, pathToGLTF, name, interactive, mass }) => {
						return (
							<ProteinGroup
								key={pathToGLTF}
								{...{
									particleName: name,
									particle,
									interactive,
									scale,
									pathToGLTF,
									temperature,
									mass,
								}}
							/>
						);
					}
				)}
				<Walls />
				<CellMembrane />
			</Physics>
			{/* <Effects /> */}
		</>
	);
};

PROTEINS.forEach(({ pathToGLTF }) => useGLTF.preload(pathToGLTF));

// instance performance https://codesandbox.io/embed/r3f-instanced-colors-8fo01
// <instancedMesh args={[geometry, material, count]}>

export default Scene;

function useAudioTrack() {
	const [play, { isPlaying, pause }] = useSound(music, { volume: 1 });
	const isAudioEnabled = useControl("audio", {
		group: "Environment",
		type: "boolean",
		value: true,
		onChange: () => {
			play();
		},
	});

	useMount(() => {
		play();
	});
	useEffect(() => {
		if (isAudioEnabled && !isPlaying) {
			play();
		} else if (!isAudioEnabled && isPlaying) {
			pause();
		}
	}, [isAudioEnabled, isPlaying, play, pause]);
}
