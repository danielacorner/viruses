import { useMediaQuery } from "@material-ui/core";

export const SCALE = 0.001;
export const BREAKPOINT_MOBILE = 500;
export const BREAKPOINT_TABLET = 768;
export const BREAKPOINT_DESKTOP = 1200;
export const MIN_SCALE = 0.0005;
export const INITIAL_SCALE = 0.001;
export const MAX_SCALE = 0.03;
export const useIsTabletOrLarger = () =>
  useMediaQuery(`(min-width: ${BREAKPOINT_TABLET}px)`);

export const COMMON_MATERIAL_PROPS = {
  transparent: true,
  wireframe: false,
  depthTest: false,
  flatShading: false,
  roughness: 0.4,
  vertexColors: false,
  reflectivity: 1,
};

export const DISTORTION_TEXTURE = "/images/textures/texture-distortion-map.jpg";
