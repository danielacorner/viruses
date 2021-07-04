import { Physics } from "@react-three/cannon";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { PHYSICS_PROPS } from "../utils/PHYSICS_PROPS";
import { ALL_PROTEINS } from "../utils/PROTEINS";
import { Water } from "./Water";
import { SelectedParticleDisplay } from "./SelectedParticleDisplay";
import { isDarkModeAtom, useStore } from "../store";
import { Sky, Stars } from "@react-three/drei";
import { useAtom } from "jotai";
// import { Stars } from "./Stars";

const Scene = () => {
  // useSetTemperatureLowInitially();
  const selectedProtein = useStore((s) => s.selectedProtein);

  const [isDarkMode] = useAtom(isDarkModeAtom);
  return (
    <>
      <Lighting />
      <Physics {...PHYSICS_PROPS}>
        {ALL_PROTEINS.map((protein) => {
          return <ProteinGroup key={protein.name} {...protein} />;
        })}
        <Water />
        <Walls />
        {isDarkMode && (
          <>
            <Stars count={1000} />
            <Sky
              rayleigh={7}
              mieCoefficient={0.1}
              mieDirectionalG={1}
              turbidity={50}
            />
          </>
        )}
        {/* <Environment
          background={true}
          files={[
            "scene_r.jpg",
            "scene_l.jpg",
            "scene_u.jpg",
            "scene_d.jpg",
            "scene_f.jpg",
            "scene_b.jpg",
            // "posx.jpg",
            // "negx.jpg",
            // "posy.jpg",
            // "negy.jpg",
            // "posz.jpg",
            // "negz.jpg",
          ]}
          path={`/images/textures/atmosphere/`}
          // preset={"night"}
          scene={undefined} // adds the ability to pass a custom THREE.Scene
        /> */}
        {/* {selectedProtein && <SelectedParticleDisplay />} */}
        {/* <Cells /> */}
      </Physics>
      {/* <CustomEffects /> */}
    </>
  );
};

export default Scene;
