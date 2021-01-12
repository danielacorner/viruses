import React, { useState } from "react";
import { useStore } from "../store";
import styled from "styled-components/macro";
import { Close, Fullscreen, FullscreenExit } from "@material-ui/icons";
import {
  ClickAwayListener,
  IconButton,
  Modal,
  Typography,
} from "@material-ui/core";
import { startCase } from "lodash";
import { Protein } from "../utils/PROTEINS";
const TOOLTIP = {
  height: 420,
  width: 300,
};

const Tooltip = () => {
  const [maximized, setMaximized] = useState(false);
  const selectedProtein = useStore((s) => s.selectedProtein as Protein);

  return selectedProtein ? (
    <>
      <Modal open={maximized}>
        <ClickAwayListener onClickAway={() => setMaximized(false)}>
          <TooltipStyles
            // onTouchStart={() => setMaximized(!maximized)}
            maximized={true}
          >
            <TooltipContent {...{ maximized, setMaximized }} />
          </TooltipStyles>
        </ClickAwayListener>
      </Modal>
      <TooltipStyles
        // onTouchStart={() => setMaximized(!maximized)}
        onClick={() => {
          if (!maximized) {
            setMaximized(true);
          }
        }}
        height={TOOLTIP.height}
        width={TOOLTIP.width}
      >
        <TooltipContent {...{ maximized, setMaximized }} />
      </TooltipStyles>
    </>
  ) : null;
};

function TooltipContent({
  maximized,
  setMaximized,
}: {
  maximized: boolean;
  setMaximized: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const set = useStore((s) => s.set);
  const selectedProtein = useStore((s) => s.selectedProtein as Protein);

  const BtnClose = () => (
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
  );

  return (
    <div className="tooltipContent">
      {maximized ? <BtnClose /> : null}
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
      <div
        className="imgWrapper"
        onClick={() => {
          if (maximized) {
            setMaximized(false);
          }
        }}
      >
        <img
          src={
            maximized &&
            // have 720p image for protein?
            (selectedProtein.pathToImage.includes("adenovirus") ||
              selectedProtein.pathToImage.includes("rice_dwarf") ||
              selectedProtein.pathToImage.includes("sindbis"))
              ? /* add "_720" before .webp */ `${selectedProtein.pathToImage.slice(
                  0,
                  -5
                )}_720.webp`
              : selectedProtein.pathToImage
          }
          alt=""
        />
        {maximized ? null : <BtnClose />}
        <IconButton
          className="btnMaximize"
          onClick={(e) => {
            e.stopPropagation();
            setMaximized((prev) => !prev);
          }}
        >
          {maximized ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </div>
      <div className="pubmedAbstract">
        {maximized ? (
          <p className="authors">{selectedProtein.authors}</p>
        ) : null}
        <p>
          {selectedProtein.pubmedAbstract.length > 100 && !maximized
            ? selectedProtein.pubmedAbstract.slice(0, 100) + "..."
            : selectedProtein.pubmedAbstract}
        </p>
      </div>
    </div>
  );
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TooltipStyles = styled.div`
  position: fixed;
  ${(props) => (props.maximized ? "background: white;" : "")}
  bottom: ${(props) => (props.maximized ? 32 : 12)}px;
  left: ${(props) => (props.maximized ? 32 : 0)}px;
  ${(props) =>
    props.maximized
      ? `
    right:32px; top:32px;
  `
      : ""}
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  .tooltipContent {
    box-sizing: border-box;
    color: black;
    display: grid;
    grid-template-rows: auto auto 1fr ${(props) => (props.maximized ? 12 : 3)}em;
    padding: 1em;
    height: 100%;
    position: relative;
    .titleSection {
      text-align: left;
      display: grid;
      height: 1.5em;
      grid-template-columns: auto 1fr;
      align-content: end;
      align-items: center;
      grid-gap: 0.5em;
      h6 {
        font-style: italic;
        color: hsl(0, 0%, 50%);
        line-height: 1em;
      }
      a {
        color: #14bcff;
      }
      .title {
        font-size: 1.2em;
        line-height: 1.2em;
        ${(props) =>
          props.maximized
            ? `
        text-shadow: 0px -1px 4px white, 0px -1px 4px white, 0px -1px 4px white, 0px -1px 4px white, 0px -1px 4px white;
        `
            : ""}
      }
    }
    .details {
      display: grid;
      height: fit-content;
      font-size: 0.8em;
      grid-template-columns: 1.5fr 0.6fr 1.5fr;
      ${(props) =>
        props.maximized
          ? `
      width: fit-content;
      grid-gap: 1em;
      `
          : ""}
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
      background: white;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        box-sizing: border-box;
        opacity: ${(props) => (props.maximized ? 1 : 0.6)};
      }
    }
    button {
      font-size: 32px;
      position: absolute;
      color: black;
    }
    .btnClose {
      position: absolute;
      top: 0em;
      right: 0em;
    }
    .btnMaximize {
      bottom: 0em;
      right: 0em;
    }
    .pubmedAbstract {
      ${(props) =>
        props.maximized
          ? `
      overflow: auto;
      line-height: 1.5em;
      padding: 0.5em;
      `
          : ""}
      .authors {
        font-style: italic;
      }
    }
  }
`;

export default Tooltip;
