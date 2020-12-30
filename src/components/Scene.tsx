import React, { useEffect } from "react";
import { Physics } from "@react-three/cannon";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { useControl } from "react-three-gui";
import { Walls } from "./Walls";
import SarsCov2 from "./GLTFs/SarsCov2";
import Model1bv1 from "./GLTFs/1bv1";
import ModelAntibody from "./GLTFs/antibody";
import ProteinGroup from "./ProteinGroup";
import { useMount } from "../utils/utils";
import useSound from "use-sound";
import music from "../assets/music";
import { PHYSICS_PROPS } from "../utils/constants";

const PROTEINS = [
	{
		name: "SarsCov2",
		particle: SarsCov2,
		scale: 0.005,
		pathToGLTF: "/models/SarsCov2/scene.gltf",
		interactive: true,
	},
	{
		name: "1bv1",
		particle: Model1bv1,
		scale: 0.005,
		pathToGLTF: "/models/1bv1/scene.gltf",
		interactive: true,
	},
	{
		name: "antibody",
		particle: ModelAntibody,
		scale: 0.005,
		pathToGLTF: "/models/antibody/scene.gltf",
		interactive: false,
	},
];

const Scene = () => {
	const temperature: number = useControl("temperature", {
		group: "Environment",
		type: "number",
		min: 0,
		max: 0.5,
		value: 0.01,
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
				{PROTEINS.map(({ particle, scale, pathToGLTF, name, interactive }) => {
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
							}}
						/>
					);
				})}
				<Walls />
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
