import { Physics } from "@react-three/cannon";
import { Environment, OrbitControls } from "@react-three/drei";
import { Lighting } from "./Lighting";
import { Walls } from "./Walls";
import ProteinGroup from "./ProteinGroup";
import { PHYSICS_PROPS } from "../utils/PHYSICS_PROPS";
import { PROTEINS } from "../utils/PROTEINS";
import { Water } from "./Water";
import { SelectedParticleDisplay } from "./SelectedParticleDisplay";

const randIdx = Math.ceil(Math.random() * 4);
const Scene = () => {
  // useSetTemperatureLowInitially();

  const proteins = [
    ...PROTEINS.viruses,
    ...PROTEINS.antibodies,
    ...PROTEINS.nanotech,
  ];
  return (
    <>
      <OrbitControls />
      <Lighting />
      <Physics {...PHYSICS_PROPS}>
        {proteins.map((protein) => {
          return <ProteinGroup key={protein.name} {...protein} />;
        })}
        <Water />
        <Walls />
        <Environment
          background={true}
          files={[
            "posx.jpg",
            "negx.jpg",
            "posy.jpg",
            "negy.jpg",
            "posz.jpg",
            "negz.jpg",
          ]}
          path={`/images/textures/Storforsen${randIdx}/`}
          // preset={"forest"}
          scene={undefined} // adds the ability to pass a custom THREE.Scene
        />
        <SelectedParticleDisplay />
        {/* <Cells /> */}
      </Physics>
      {/* <CustomEffects /> */}
    </>
  );
};

export default Scene;
