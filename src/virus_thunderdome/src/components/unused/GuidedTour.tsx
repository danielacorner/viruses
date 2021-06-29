import { IconButton, Tooltip } from "@material-ui/core";
import { GitHub, Help } from "@material-ui/icons";
import React, { useState } from "react";
import Tour from "reactour";
import { useLocalStorageState } from "../../utils/useLocalStorageState";
import styled from "styled-components/macro";
import { getIsTouchDevice } from "../../utils/getIsTouchDevice";
import { useStore } from "../../store";

// https://github.com/elrumordelaluz/reactour

const GuidedTour = () => {
  // only show once we've started
  const started = useStore((s) => s.started);
  // show the tour if it's our first time visiting the app
  const [isFirstVisit, setIsFirstVisit] = useLocalStorageState(
    "isFirstVisit",
    "true"
  );
  const [isTourOpen, setIsTourOpen] = useState(isFirstVisit === "true");

  return !started ? null : (
    <>
      <Tour
        steps={TOUR_STEPS}
        isOpen={isTourOpen}
        onRequestClose={() => {
          setIsTourOpen(false);
          setIsFirstVisit("false");
        }}
        badgeContent={(curr, tot) => `${curr}/${tot}`}
      />
      <ButtonStartTour {...{ setIsTourOpen }} />
      <LinkToGithub />
      <InitialTerrariumPositionStyles />
      <FullScreenPositionStyles />
    </>
  );
};

export default GuidedTour;

function LinkToGithub() {
  const selectedProtein = useStore((s) => s.selectedProtein);
  return (
    <a
      href="https://github.com/danielacorner/viruses"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Tooltip title="GitHub repository">
        <IconButton
          size="small"
          style={{
            position: "fixed",
            opacity: selectedProtein ? 0.2 : 0.6,
            bottom: 8,
            left: 8,
            transform: "scale(0.9)",
          }}
        >
          <GitHub />
        </IconButton>
      </Tooltip>
    </a>
  );
}
function ButtonStartTour({ setIsTourOpen, ...props }) {
  return (
    <ButtonStartTourStyles {...props}>
      <Tooltip title="Tour">
        <IconButton size="small" onClick={() => setIsTourOpen(true)}>
          <Help />
        </IconButton>
      </Tooltip>
    </ButtonStartTourStyles>
  );
}
const ButtonStartTourStyles = styled.div`
  position: fixed;
  top: 0.5em;
  left: 0.5em;
`;

const SQUARE_WIDTH = 700;
/** a square window to highlight the virus-containing cube's initial position */
export const FullScreenPositionStyles = styled.div`
  pointer-events: none;
  position: fixed;
  top: 32px;
  bottom: 32px;
  left: 32px;
  right: 32px;
`;
/** a square window to highlight the draggable area */
export const InitialTerrariumPositionStyles = styled.div`
  pointer-events: none;
  position: fixed;
  top: 50vh;
  left: 50vw;
  margin-top: -${SQUARE_WIDTH / 2}px;
  margin-left: -${SQUARE_WIDTH / 2}px;
  width: ${SQUARE_WIDTH}px;
  height: ${SQUARE_WIDTH}px;
`;

const TOUR_STEPS = [
  {
    selector: "[class*='ButtonStartTourStyles']",
    content: () => (
      <div>
        <p>Hey, welcome! 👋</p>
        <p>
          This app visualizes 3D model and mass data from{" "}
          <div>
            <a
              style={{ textDecoration: "none" }}
              href="https://www.rcsb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Protein Databank 🦠
            </a>
          </div>
        </p>
      </div>
    ),
  },
  {
    selector: "[class*='ScaleControlsStyles']",
    content: () => (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3em auto",
        }}
      >
        <p>🔬⚛</p>
        <div>When you change the scale, different particles come into view</div>
      </div>
    ),
  },
  {
    selector: "[class*='BottomControls']",
    content: () => (
      <div>
        <p>Control the temperature 🔥</p>
        <div>or pause ⏸ the simulation </div>
      </div>
    ),
  },
  {
    selector: "[class*='InitialTerrariumPositionStyles']",
    content: () => {
      const isTouchDevice = getIsTouchDevice();
      return (
        <div style={{ lineHeight: "1.6em", textAlign: "center" }}>
          <div>👆➡</div>
          <div>Drag to orbit, </div>
          <div>{isTouchDevice ? "Pinch" : "Scroll"} to zoom, </div>
          <div>
            {isTouchDevice ? "Two-finger-drag" : "Right-click-drag"} to move.
          </div>
          <div>
            {isTouchDevice ? "Tap" : "Click"} a particle to learn more about it!
          </div>
        </div>
      );
    },
  },
];
