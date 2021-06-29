import { useLoader, useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
const SKYBOX_IMAGES = [
  "/images/skybox/cryo-em.jpg",
  "/images/skybox/cryo-em.jpg",
  "/images/skybox/cryo-em.jpg",
  "/images/skybox/cryo-em.jpg",
  "/images/skybox/cryo-em.jpg",
  "/images/skybox/cryo-em.jpg",
];
/** Loads the skybox texture and applies it to the scene. */
export function SkyBox() {
  const { scene } = useThree();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  // @ts-ignore
  const [envMap] = useLoader(CubeTextureLoader, [SKYBOX_IMAGES]);

  // Set the scene background property to the resulting texture.
  scene.background = envMap;
  return null;
}
