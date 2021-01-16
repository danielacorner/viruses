import { IconButton, Tooltip } from "@material-ui/core";
import { GitHub, Help } from "@material-ui/icons";
import React, { useState } from "react";
import Tour from "reactour";
import { useLocalStorageState } from "../utils/useLocalStorageState";
import styled from "styled-components/macro";
import { getIsTouchDevice } from "../getIsTouchDevice";
import { useProgress } from "@react-three/drei";
import { useStore } from "../store";

// https://github.com/elrumordelaluz/reactour

const GuidedTour = () => {
  // show the tour if it's our first time visiting the app
  const [isFirstVisit, setIsFirstVisit] = useLocalStorageState(
    "isFirstVisit",
    "true"
  );
  const [isTourOpen, setIsTourOpen] = useState(isFirstVisit === "true");
  console.log("🌟🚨 ~ GuidedTour ~ isFirstVisit", isFirstVisit);

  const { active, progress, errors, item, loaded, total } = useProgress();
  console.log("🌟🚨 ~ GuidedTour ~ active", active);

  return active ? null : (
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
function ButtonStartTour({ setIsTourOpen }) {
  return (
    <ButtonStartTourStyles>
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
      <div>
        <div>
          🔬 When you change the scale, different particles come into view ⚛
        </div>
        {/* <div style={{ fontSize: "1rem" }}>(they may need time to load)</div> */}
      </div>
    ),
  },
  {
    selector: "[class*='BottomControls']",
    content: () => (
      <div>
        <div>Control the temperature 🔥</div>
        <div>⏸ or pause the simulation </div>
      </div>
    ),
  },
  {
    selector: "[class*='InitialTerrariumPositionStyles']",
    content: () => {
      const isTouchDevice = getIsTouchDevice();
      return (
        <div>
          👩‍🔬🔎 {isTouchDevice ? "Tap" : "Click"} on a particle to learn more
          about it!
        </div>
      );
    },
  },
];
