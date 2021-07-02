import React from "react";
import { TemperatureControls } from "./TemperatureControls";
import { PauseControls } from "./PauseControls";
import styled from "styled-components/macro";
import { darkText, darkTextShadow } from "./utils/colors";

const StyledDiv = styled.div``;
export default function BottomControls() {
  return (
    <StyledDiv
      css={`
        position: fixed;
        bottom: 16px;
        left: 30vw;
        right: 16px;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        grid-gap: 2em;
        color: ${darkText};
        text-shadow: ${darkTextShadow};
        .MuiSlider-root {
          color: hsl(0, 0%, 30%);
        }
      `}
    >
      {/* <ShuffleControls /> */}
      <TemperatureControls />
      <PauseControls />
    </StyledDiv>
  );
}
