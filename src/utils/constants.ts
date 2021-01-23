import { useMediaQuery } from "@material-ui/core";

export const SCALE = 0.001;
export const BREAKPOINT_MOBILE = 500;
export const BREAKPOINT_TABLET = 768;
export const BREAKPOINT_DESKTOP = 1200;
export const MIN_SCALE = 0.0005;
export const MAX_SCALE = 0.03;
export const useIsTabletOrLarger = () =>
  useMediaQuery(`(min-width: ${BREAKPOINT_TABLET}px)`);
