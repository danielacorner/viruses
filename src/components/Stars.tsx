import React, { useMemo, useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";

// https://codesandbox.io/s/9y8vkjykyy?file=/src/index.js
export function Stars() {
	let group = useRef(null as any);
	let spin = 0.1;
	const speed = 0.0001;
	let scale = 1;
	useFrame(() => {
		// Some things maybe shouldn't be declarative, we're in the render-loop here with full access to the instance
		// const r = 5 * Math.sin(degToRad((speed += 0.1)));
		// const s = Math.cos(degToRad(speed * 2));
		group.current.rotation.set(spin, spin, (spin += speed));
		group.current.scale.set(scale, scale, scale);
	});
	const [geo, mat, coords] = useMemo(() => {
		const nGeo = new THREE.SphereBufferGeometry(1, 10, 10);
		const nMat = new THREE.MeshBasicMaterial({
			color: new THREE.Color("cornflowerblue"),
		});
		const nCoords = new Array(2000)
			.fill(null)
			.map((i) => [
				Math.random() * 800 - 400,
				Math.random() * 800 - 400,
				Math.random() * 800 - 400,
			]);
		return [nGeo, nMat, nCoords];
	}, []);

	return (
		<group ref={group}>
			{coords.map(([p1, p2, p3], i) => (
				<mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
			))}
		</group>
	);
}

function degToRad(degrees) {
	var pi = Math.PI;
	return degrees * (pi / 180);
}
