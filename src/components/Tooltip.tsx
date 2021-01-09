import React, { useState } from "react";
import { useStore } from "../store";
import styled from "styled-components/macro";
import { Close, Fullscreen, FullscreenExit } from "@material-ui/icons";
import { IconButton, Typography } from "@material-ui/core";
import { useWindowSize } from "../utils/hooks";
import { startCase } from "lodash";
import { Protein } from "../utils/PROTEINS";
const TOOLTIP = {
  height: 390,
  width: 300,
};

const Tooltip = () => {
  const selectedProtein = useStore((s) => s.selectedProtein as Protein);
  const set = useStore((s) => s.set);
  console.log("🌟🚨 ~ Tooltip ~ selectedProtein", selectedProtein);
  const [maximized, setMaximized] = useState(false);
  const windowSize = useWindowSize();
  console.log("🌟🚨: Tooltip -> selectedProtein", selectedProtein);
  return selectedProtein ? (
    <TooltipStyles
      maximized={maximized}
      onTouchStart={() => setMaximized(true)}
      height={
        maximized
          ? Math.min(windowSize.width, windowSize.height)
          : TOOLTIP.height
      }
      width={
        maximized
          ? Math.min(windowSize.width, windowSize.height)
          : TOOLTIP.width
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
          <Typography variant="subtitle1">{selectedProtein.type}</Typography>
          <a
            href={selectedProtein.PDBUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography className="title" variant="body1">
              {startCase(selectedProtein.name)}
            </Typography>
          </a>
        </div>
        <img src={selectedProtein.pathToImage} alt="" />
        <div className="details">
          <div className="weight">
            {numberWithCommas(selectedProtein.mass)} kDa
          </div>
          <div className="atomCount">
            {numberWithCommas(
              selectedProtein.atomCount *
                selectedProtein.numIcosahedronFaces /* ! 12 for most icosahedral proteins? */
            )}{" "}
            atoms
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
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  .tooltipContent {
    box-sizing: border-box;
    color: black;
    display: grid;
    grid-template-rows: auto 1fr auto;
    padding: 1em;
    height: 100%;
    position: relative;
    .titleSection {
      text-align: left;
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
      font-size: 32px;
      position: absolute;
      color: black;
    }
    .btnMaximize {
      top: 3em;
      right: 1em;
    }
    .btnClose {
      top: 1em;
      right: -1em;
    }
  }
`;

export default Tooltip;
