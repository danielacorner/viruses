import { useMediaQuery } from "@material-ui/core";

export const SCALE = 0.001;
export const BREAKPOINT_MOBILE = 500;
export const BREAKPOINT_TABLET = 768;
export const BREAKPOINT_DESKTOP = 1200;
export const MIN_SCALE = 0.0005;
export const MAX_SCALE = 0.03;
export const useIsTabletOrLarger = () =>
  useMediaQuery(`(min-width: ${BREAKPOINT_TABLET}px)`);

export const CUSTOM_SCROLLBAR_CSS = `
@supports (overflow: overlay){
  overflow: overlay;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 16px;
    background: none;
  }
  /* directional buttons */
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  /* empty space "below" the progress bar */
  &::-webkit-scrollbar-track {
    background: none;
  }
  /* top-most layer of the progress bar not covered by the draggable scrolling element */
  &::-webkit-scrollbar-track-piece {
    background: none;
  }
  /* draggable scrolling element that resizes depending on the size of the scrollable element */
  &::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    border-radius: 99px;
    background-color: rgba(88, 89, 91, 0.2);
    box-sizing: border-box;
    background-clip: padding-box;
    padding: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(88, 89, 91, 0.6);
  }
  /* the (usually) bottom corner of the scrollable element, where two scrollbars might meet */
  &::-webkit-scrollbar-corner {
    background: none;
  }
}
`;
