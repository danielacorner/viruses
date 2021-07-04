import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { getIsTouchDevice } from "../getIsTouchDevice";
import { useStore } from "../store";

export function Lighting() {
  return (
    <>
      <color attach="background" args={["#ffffff"] as any} />
      {!getIsTouchDevice() && <LightFollowsMouse />}

      {/* <SpotLightOnSelectedProtein /> */}
      <ambientLight intensity={0.3} />
      {/* <pointLight position={[-10, -10, -10]} intensity={1} /> */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
    </>
  );
}

// function SpotLightOnSelectedProtein() {
//   const selectedProtein = useStore((s) => s.selectedProtein);
//   const worldRadius = useStore((s) => s.worldRadius);
//   const [scale] = useAtom(scaleAtom)
//   const set = useStore((s) => s.set);
//   const [selectedCoords, setSelectedCoords] = useState({ x: 0, y: 0, z: 0 });

//   // selected particle position
//   const currentPosition = useRef(null as null | [number, number, number]);
//   useEffect(() => {
//     if (selectedProtein) {
//       selectedProtein.api.position.subscribe(
//         (p) => (currentPosition.current = p)
//       );
//     }
//     return () => {
//       currentPosition.current = null;
//     };
//   }, [selectedProtein]);

//   // https://github.com/pmndrs/use-cannon/issues/115
//   // when the scale changes, physics bodies are added/removed,
//   // which breaks the simulation if we have any active subscriptions
//   // so, unsubscribe when scale changes
//   useEffect(() => {
//     set({ selectedProtein: null });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [scale]);

//   useFrame(() => {
//     if (currentPosition.current?.[0]) {
//       setSelectedCoords({
//         x: currentPosition.current[0],
//         y: currentPosition.current[1],
//         z: currentPosition.current[2],
//       });
//     }
//   });

//   const spotlight = useMemo(() => new THREE.SpotLight(0xffffff), []);
//   const rScaled = selectedProtein?.radius * scale;

//   return !selectedProtein ? null : (
//     <>
//       {/* src: https://spectrum.chat/react-three-fiber/general/how-to-set-spotlight-target~823340ea-433e-426a-a0dc-b9a333fc3f94 */}
//       <primitive
//         object={spotlight}
//         angle={0.12}
//         intensity={1.3}
//         penumbra={0.2}
//         distance={worldRadius * 15}
//         position={[
//           selectedCoords.x,
//           selectedCoords.y,
//           selectedCoords.z + 15 * rScaled,
//         ]}
//       />
//       <primitive
//         object={spotlight.target}
//         position={[selectedCoords.x, selectedCoords.y, selectedCoords.z]}
//       />
//     </>
//   );
// }

function LightFollowsMouse() {
  const light = useRef(null as any);
  const { viewport, mouse } = useThree();
  const wr = useStore((s) => s.worldRadius);

  useFrame(({ camera }) => {
    // Makes the light follow the mouse
    light.current?.position.set(
      mouse.x * viewport.width,
      // (mouse.x * viewport.width) / 2,
      mouse.y * viewport.height,
      // y2 + (mouse.y * viewport.height) / 2,
      -camera.position.z
    );
  });

  return (
    <>
      {/* <mesh ref={light}>
        <meshBasicMaterial color="black" />
        <boxBufferGeometry args={[1, 1, 1]} />
      </mesh> */}
      <pointLight
        ref={light}
        distance={60}
        intensity={10.2}
        color="lightblue"
      />
    </>
  );
}
