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
      onTouchStart={() => setMaximized(!maximized)}
      onClick={() => setMaximized(!maximized)}
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
        <div className="titleSection">
          <a
            href={selectedProtein.PDBUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography className="title" variant="body1">
              {startCase(selectedProtein.name)}
            </Typography>
          </a>
          <Typography variant="subtitle1" style={{ whiteSpace: "nowrap" }}>
            {" "}
            — {selectedProtein.type}
          </Typography>
        </div>

        <div className="details">
          <div className="measurement weight">
            <div className="label">weight</div>
            <div className="value">
              {numberWithCommas(selectedProtein.mass)} kDa
            </div>
          </div>
          <div className="measurement radius">
            <div className="label">radius</div>
            <div className="value">{Math.round(selectedProtein.radius)} Å</div>
          </div>
          <div className="measurement atomCount">
            <div className="label"></div>
            <div className="value">
              {numberWithCommas(
                selectedProtein.atomCount *
                  selectedProtein.numIcosahedronFaces /* ! 12 for most icosahedral proteins? */
              )}{" "}
              atoms
            </div>
          </div>
        </div>
        <ClickAwayListener onClickAway={() => setMaximized(false)}>
          <div className="imgWrapper">
            <img src={selectedProtein.pathToImage} alt="" />
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
              <IconButton className="btnOpenInNew">
                <a
                  href={selectedProtein.pathToImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <OpenInNew />
                </a>
              </IconButton>
            )}
          </div>
        </ClickAwayListener>
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
    grid-template-rows: auto auto 1fr;
    padding: 1em;
    height: 100%;
    position: relative;
    .titleSection {
      text-align: left;
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      grid-gap: 0.5em;
      h6 {
        font-style: italic;
        color: hsl(0, 0%, 50%);
        line-height: 1em;
      }
      a {
        color: #14bcff;
        pointer-events: auto;
      }
      .title {
        font-size: 1.2em;
      }
    }
    .details {
      display: grid;
      height: fit-content;
      font-size: 0.8em;
      grid-template-columns: 1.5fr 0.6fr 1.5fr;
      margin-bottom: -2em;
      .measurement {
        display: grid;
        grid-template-rows: auto auto;
        align-items: flex-end;
        justify-items: left;
        &.atomCount .value {
          justify-self: right;
        }
        .label {
          color: hsl(0, 0%, 50%);
          /* justify-self: right; */
        }
      }
    }
    .imgWrapper {
      min-height: 270px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        box-sizing: border-box;
        opacity: ${(props) => (props.maximized ? 1 : 0.6)};
      }

      button {
        font-size: 32px;
        position: absolute;
        color: black;
        pointer-events: auto;
      }
      .btnClose {
        top: 0.6em;
        right: -0.3em;
      }
      .btnMaximize {
        bottom: 0.6em;
        right: -0.3em;
      }
      .btnOpenInNew {
        top: 0.6em;
        right: -0.3em;
      }
    }
  }
`;

export default Tooltip;
