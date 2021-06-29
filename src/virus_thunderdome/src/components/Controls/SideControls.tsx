import React from "react";
import styled from "styled-components/macro";
import { PauseControls } from "./PauseControls";
import { TemperatureControls } from "./TemperatureControls";

const SideControls = () => {
  return (
    <Styles>
      <TemperatureControls />
      <div className="pause">
        <PauseControls />
      </div>
    </Styles>
  );
};
const Styles = styled.div`
  position: fixed;
  right: 16px;
  height: calc(100vh - 204px);
  bottom: 112px;
  min-height: 50vh;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 1em;
  .pause {
    margin: auto;
  }
`;

export default SideControls;
