import React, { useState } from "react";
import { useStore } from "../store";
import styled from "styled-components/macro";
import { Close, Fullscreen, FullscreenExit } from "@material-ui/icons";
import { IconButton, Typography } from "@material-ui/core";
import { useWindowSize } from "../utils/hooks";
import { startCase } from "lodash";
const TOOLTIP_HEIGHT = 390;

const Tooltip = () => {
  const selectedProtein = useStore(({ selectedProtein }) => selectedProtein);
  const set = useStore(({ set }) => set);
  console.log("🌟🚨 ~ Tooltip ~ selectedProtein", selectedProtein);
  const [maximized, setMaximized] = useState(false);
  const windowSize = useWindowSize();
  console.log("🌟🚨: Tooltip -> selectedProtein", selectedProtein);
  return selectedProtein ? (
    <TooltipStyles
      maximized={maximized}
      height={
        maximized
          ? Math.min(windowSize.width, windowSize.height)
          : TOOLTIP_HEIGHT
      }
    >
      <div className="tooltipContent">
        <IconButton
          className="btnClose"
          onClick={() => {
            setMaximized(false);
            set({ selectedProtein: null });
          }}
        >
          <Close />
        </IconButton>
        <IconButton
          className="btnMaximize"
          onClick={() => setMaximized((prev) => !prev)}
        >
          {maximized ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
        <div className="titleSection">
          <a
            href={selectedProtein.PDBUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography className="title" variant="h6">
              {startCase(selectedProtein.name)}
            </Typography>
          </a>
          <Typography variant="subtitle1">{selectedProtein.type}</Typography>
        </div>
        <img src={selectedProtein.pathToImage} alt="" />
        <div className="details">
          <div className="weight">
            {numberWithCommas(selectedProtein.mass)} kDa
          </div>
          <div className="atomCount">
            {numberWithCommas(selectedProtein.atomCount)} atoms
          </div>
        </div>
      </div>
    </TooltipStyles>
  ) : null;
};

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TooltipStyles = styled.div`
  opacity: ${(props) => (props.maximized ? 1 : 0.9)};
  position: fixed;
  bottom: 0;
  left: 0;
  width: ${(props) => props.height}px;
  height: ${(props) => props.height}px;
  .tooltipContent {
    box-sizing: border-box;
    background: black;
    color: white;
    display: grid;
    grid-template-rows: auto 1fr auto;
    padding: 1em;
    height: 100%;
    position: relative;
    .titleSection {
      text-align: center;
      a {
        color: #14bcff;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 0.5em;
      box-sizing: border-box;
    }
    .details {
      display: grid;
      grid-template-columns: 1fr auto;
    }

    button {
      position: absolute;
      color: white;
    }
    .btnMaximize {
      top: 32px;
      right: 0;
    }
    .btnClose {
      top: 0;
      right: 0;
    }
  }
`;

export default Tooltip;
