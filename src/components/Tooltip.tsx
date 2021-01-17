import React, { useState } from "react";
import { useStore } from "../store";
import styled from "styled-components/macro";
import { Close, Fullscreen, FullscreenExit } from "@material-ui/icons";
import {
  ClickAwayListener,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { startCase } from "lodash";
import { Protein } from "../utils/PROTEINS";
import { BREAKPOINT_DESKTOP } from "../utils/constants";
const TOOLTIP = {
  height: 432,
  width: 300,
};

const Tooltip = () => {
  const [maximized, setMaximized] = useState(false);
  const selectedProtein = useStore((s) => s.selectedProtein as Protein);
  const isDesktopOrLarger = useMediaQuery(
    `(min-width: ${BREAKPOINT_DESKTOP}px)`
  );
  const isHorizontalLayout = maximized && isDesktopOrLarger;

  return selectedProtein ? (
    <>
      <Modal open={maximized}>
        <ClickAwayListener onClickAway={() => setMaximized(false)}>
          <TooltipStyles
            // onTouchStart={() => setMaximized(!maximized)}
            maximized={true}
            isDesktopOrLarger={isDesktopOrLarger}
            isHorizontalLayout={isHorizontalLayout}
          >
            <TooltipContent {...{ maximized, setMaximized }} />
          </TooltipStyles>
        </ClickAwayListener>
      </Modal>
      <TooltipStyles
        height={TOOLTIP.height}
        width={TOOLTIP.width}
        isDesktopOrLarger={isDesktopOrLarger}
        isHorizontalLayout={isHorizontalLayout}
      >
        <TooltipContent {...{ maximized, setMaximized }} />
      </TooltipStyles>
    </>
  ) : null;
};

function BtnMaximize(props) {
  return (
    <IconButton
      className="btnMaximize"
      onClick={(e) => {
        e.stopPropagation();
        props.setMaximized((prev) => !prev);
      }}
    >
      {props.maximized ? (
        props.isDesktopOrLarger ? null : (
          <FullscreenExit />
        )
      ) : (
        <Fullscreen />
      )}
    </IconButton>
  );
}

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

  const isDesktopOrLarger = useMediaQuery(
    `(min-width: ${BREAKPOINT_DESKTOP}px)`
  );
  const ParticleImage = (props) => (
    <img
      {...props}
      src={
        maximized &&
        // have 720p image for protein? -> add "_720" before .webp
        !selectedProtein.pathToImage.includes("faustovirus") &&
        !selectedProtein.pathToImage.includes("varicella") &&
        !selectedProtein.pathToImage.includes("hiv.webp") &&
        !selectedProtein.pathToImage.includes("sh1")
          ? `${selectedProtein.pathToImage.slice(0, -5)}_720.webp`
          : selectedProtein.pathToImage
      }
      alt=""
    />
  );
  const isHorizontalLayout = maximized && isDesktopOrLarger;
  return (
    <div
      style={
        maximized && isDesktopOrLarger
          ? {
              display: "grid",
              gridTemplateColumns: "calc(70vw - 128px) auto",
              height: "100%",
            }
          : {}
      }
    >
      {maximized && isDesktopOrLarger ? (
        <ParticleImage
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : null}
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
        {/* {isHorizontalLayout&& ? null : <BtnClose />} */}
        {isHorizontalLayout ? null : (
          <div
            className="imgWrapper"
            onClick={() => {
              setMaximized((prev) => !prev);
            }}
          >
            {maximized ? null : <BtnClose />}
            <ParticleImage />
            <BtnMaximize
              {...{
                maximized,
                setMaximized,
                isDesktopOrLarger,
              }}
            />
          </div>
        )}
        <div
          className="pubmedAbstract"
          onClick={() => {
            if (!maximized) {
              setMaximized(true);
            }
          }}
        >
          {maximized ? (
            <p className="authors">{selectedProtein.authors}</p>
          ) : null}
          {selectedProtein.pubmedAbstract.length > 100 && !maximized
            ? selectedProtein.pubmedAbstract.slice(0, 100) + "..."
            : selectedProtein.pubmedAbstract}
        </div>
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
    max-height: 90vh;
    overflow: ${(props) => (props.maximized ? "auto" : "visible")};
    padding: 1em;
    ${(props) =>
      props.isHorizontalLayout
        ? `
        align-content: flex-start;
        padding-right: 3em;
        padding-top: 3em;
        `
        : ""}
    opacity: ${(props) => (props.maximized ? 1 : 0.8)};
    box-sizing: border-box;
    color: black;
    display: grid;
    grid-template-rows: auto ${(props) =>
        props.maximized && props.isHorizontalLayout ? 1.5 : 2}em ${(props) =>
        props.isHorizontalLayout ? "" : "auto "} ${(props) =>
        props.maximized ? "1fr" : "4em"};
    grid-gap: 0.5em;
    position: relative;
    .titleSection {
      text-align: left;
      display: grid;
      ${(props) => (props.isHorizontalLayout ? "" : "height: 1.5em;")}
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
        white-space: nowrap;
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
      background: ${(props) => (props.maximized ? "white" : "none")};
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        box-sizing: border-box;
      }
    }
    button {
      font-size: 32px;
      position: absolute;
      color: black;
    }
    .btnClose {
      position: absolut;
      top: 0;
      right: 0;
      ${(props) =>
        props.maximized && !props.isDesktopOrLarger
          ? `
        position: fixed;
        top: 0.25em;
        right: 0.25em;
        background: hsla(0,0%,95%,0.2);
        `
          : ""}
    }
    .btnMaximize {
      bottom: 0em;
      right: 0em;
    }
    .pubmedAbstract {
      ${(props) =>
        props.maximized && !props.isDesktopOrLarger
          ? `
      line-height: 1.5em;
      padding: 0.5em;
      `
          : ""}
      .authors {
        font-style: italic;
        font-size: 0.8em;
        line-height: 1.5em;
      }
    }
  }
`;

export default Tooltip;
