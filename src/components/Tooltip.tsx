import React, { useState } from "react";
import { useStore } from "../store";
import { BREAKPOINT_MOBILE } from "../utils/constants";
import styled from "styled-components/macro";
import {
  Close,
  Fullscreen,
  FullscreenExit,
  OpenInNew,
} from "@material-ui/icons";
import {
  ClickAwayListener,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
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
  const [maximized, setMaximized] = useState(false);
  const windowSize = useWindowSize();
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINT_MOBILE}px)`);
  return selectedProtein ? (
    <TooltipStyles
      maximized={maximized}
      onTouchStart={() => setMaximized(true)}
      onClick={() => setMaximized(true)}
      height={
        maximized
          ? Math.min(windowSize.width, windowSize.height)
          : TOOLTIP.height
      }
      width={
        maximized
          ? Math.min(windowSize.width, windowSize.height) -
            (TOOLTIP.height - TOOLTIP.width)
          : TOOLTIP.width
      }
    >
      <div className="tooltipContent">
        <IconButton
          className="btnClose"
          onClick={(e) => {
            e.stopPropagation();
            setMaximized(false);
            set({ selectedProtein: null });
          }}
        >
          <Close />
        </IconButton>
        {isTabletOrLarger ? (
          <IconButton
            className="btnMaximize"
            onClick={(e) => {
              e.stopPropagation();
              setMaximized((prev) => !prev);
            }}
          >
            {maximized ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        ) : (
          <a
            href={selectedProtein.pathToImage}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton className="btnMaximize btnOpenInNew">
              <OpenInNew />
            </IconButton>
          </a>
        )}
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
        <ClickAwayListener onClickAway={() => setMaximized(false)}>
          <img src={selectedProtein.pathToImage} alt="" />
        </ClickAwayListener>
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
  position: fixed;
  bottom: 0;
  left: 0;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  pointer-events: none;
  @media (min-width: ${BREAKPOINT_MOBILE}px) {
    pointer-events: auto;
  }
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
        pointer-events: auto;
      }
      .title {
        padding-bottom: 1em;
      }
    }
    img {
      width: 100%;
      height: 100%;
      min-height: 270px;
      object-fit: contain;
      box-sizing: border-box;
      opacity: ${(props) => (props.maximized ? 1 : 0.6)};
    }
    .details {
      display: grid;
      grid-template-columns: 1fr auto;
    }

    button {
      font-size: 32px;
      position: absolute;
      color: black;
      pointer-events: auto;
    }
    .btnClose {
      top: 1em;
      right: -1em;
    }
    .btnMaximize {
      top: 3em;
      right: 1em;
    }
  }
`;

export default Tooltip;
