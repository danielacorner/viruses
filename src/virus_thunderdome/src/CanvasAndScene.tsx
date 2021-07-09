import Scene from "./components/Scene/Scene";
import { useWindowSize } from "./utils/hooks";
import * as THREE from "three";
import TopControls from "./components/Controls/TopControls";
import { Canvas } from "@react-three/fiber";

import SideControls from "./components/Controls/SideControls";
import { BREAKPOINT_TABLET, INITIAL_CAMERA_POSITION } from "./utils/constants";
import AudioSoundButton from "../../components/controls/AudioSoundButton";

export default function CanvasAndScene({ renderProteins = true }) {
  const windowSize = useWindowSize();
  return (
    <>
      <AudioSoundButton
        title={"Nōpi - Aqiral"}
        href={"https://www.youtube.com/watch?v=c-o8o9cYJeY"}
      />
      {/* <Controls.Provider> */}
      <Canvas
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
        gl={{ antialias: false, alpha: false }}
        style={{
          height: windowSize.height,
          width: windowSize.width,
          touchAction: "none",
        }}
        camera={{ fov: 75, position: INITIAL_CAMERA_POSITION as any }}
      >
        <Scene />
      </Canvas>
      {/* {process.env.NODE_ENV === "development" && isTabletOrLarger ? (
          <Controls />
        ) : null} */}
      {/* </Controls.Provider> */}
      {/* <HideHpControls /> */}
      <SideControls />
      <TopControls />
    </>
  );
}

// function HideHpControls() {
//   const set = useStore((s) => s.set);
//   const showHp = useStore((s) => s.showHp);
//   return (
//     <div style={{ position: "fixed", top: 6, right: 16 }}>
//       <IconButton onClick={() => set({ showHp: !showHp })}>
//         {showHp ? <Visibility /> : <VisibilityOff />}
//       </IconButton>
//     </div>
//   );
// }
