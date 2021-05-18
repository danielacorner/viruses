import React from "react";
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
import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
  CUSTOM_SCROLLBAR_CSS,
} from "../utils/constants";
const TOOLTIP = {
  height: 442,
  width: 300,
};

const Tooltip = () => {
  const isTooltipMaximized = useStore((s) => s.isTooltipMaximized);
  const set = useStore((s) => s.set);
  const selectedProtein = useStore((s) => s.selectedProtein);
  const isDesktopOrLarger = useMediaQuery(
    `(min-width: ${BREAKPOINT_DESKTOP}px)`
  );
  const isTabletOrLarger = useMediaQuery(`(min-width: ${BREAKPOINT_TABLET}px)`);
  const isHorizontalLayout = isTooltipMaximized && isDesktopOrLarger;

  return selectedProtein ? (
    <>
      <Modal open={isTooltipMaximized}>
        <ClickAwayListener
          onClickAway={() => set({ isTooltipMaximized: false })}
        >
          <TooltipStyles
            // onTouchStart={() => setMaximized(!maximized)}
            maximized={true}
            isDesktopOrLarger={isDesktopOrLarger}
            isHorizontalLayout={isHorizontalLayout}
          >
            <TooltipContent />
          </TooltipStyles>
        </ClickAwayListener>
      </Modal>
      <TooltipStyles
        height={TOOLTIP.height * (isTabletOrLarger ? 1 : 0.85)}
        width={TOOLTIP.width * (isTabletOrLarger ? 1 : 0.7)}
        isDesktopOrLarger={isDesktopOrLarger}
        isHorizontalLayout={isHorizontalLayout}
      >
        <TooltipContent />
      </TooltipStyles>
    </>
  ) : null;
};

function BtnMaximize() {
  const isDesktopOrLarger = useMediaQuery(
    `(min-width: ${BREAKPOINT_DESKTOP}px)`
  );
  const set = useStore((s) => s.set);
  const isTooltipMaximized = useStore((s) => s.isTooltipMaximized);

  return (
    <IconButton
      className="btnMaximize"
      onClick={(e) => {
        e.stopPropagation();
        set({ isTooltipMaximized: !isTooltipMaximized });
      }}
    >
      {isTooltipMaximized ? (
        isDesktopOrLarger ? null : (
          <FullscreenExit />
        )
      ) : (
        <Fullscreen />
      )}
    </IconButton>
  );
}

function TooltipContent() {
  const set = useStore((s) => s.set);
  const isTooltipMaximized = useStore((s) => s.isTooltipMaximized);
  const selectedProtein = useStore((s) => s.selectedProtein);

  const BtnClose = () => (
    <IconButton
      className="btnClose"
      onClick={(e) => {
        e.stopPropagation();
        set({ isTooltipMaximized: false });
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
        isTooltipMaximized &&
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
  const isHorizontalLayout = isTooltipMaximized && isDesktopOrLarger;
  return (
    <div
      className="overflowWrapper"
      style={
        isTooltipMaximized && isDesktopOrLarger
          ? {
              display: "grid",
              gridTemplateColumns: "calc(70vw - 128px) auto",
              height: "100%",
            }
          : {}
      }
    >
      {isTooltipMaximized && isDesktopOrLarger ? (
        <div className="imgWrapper">
          <ParticleImage
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: 32,
              boxSizing: "border-box",
            }}
          />
        </div>
      ) : null}
      <div className="tooltipContent">
        {isTooltipMaximized ? <BtnClose /> : null}
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
            {selectedProtein.type}
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
            <div className="label">atoms</div>
            <div className="value">
              {numberWithCommas(
                selectedProtein.atomCount *
                  selectedProtein.numIcosahedronFaces /* ! 12 for most icosahedral proteins? */
              )}
            </div>
          </div>
        </div>
        {/* {isHorizontalLayout&& ? null : <BtnClose />} */}
        {isHorizontalLayout ? null : (
          <div
            className="imgWrapper"
            onClick={() => {
              set({ isTooltipMaximized: !isTooltipMaximized });
            }}
          >
            {isTooltipMaximized ? null : <BtnClose />}
            <ParticleImage />
            <BtnMaximize />
          </div>
        )}
        <div
          className="pubmedAbstract"
          onClick={() => {
            if (!isTooltipMaximized) {
              set({ isTooltipMaximized: true });
            }
          }}
        >
          {isTooltipMaximized ? (
            <p className="authors">{selectedProtein.authors}</p>
          ) : null}
          {selectedProtein.pubmedAbstract.length > 100 && !isTooltipMaximized
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
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 4px;
  @media (min-width: ${BREAKPOINT_MOBILE}px) {
    transform: unset;
  }
  position: fixed;
  overflow: ${(props) => (props.maximized ? "hidden" : "visible")};
  ${(props) => (props.maximized ? "background: white;" : "")}
  bottom: ${(props) => (props.maximized ? 32 : 12)}px;
  left: ${(props) => (props.maximized ? 32 : 0)}px;
  ${(props) =>
    props.maximized
      ? `
    box-shadow: 0px 4px 9px 0px #0000005c;
    right:32px;
    top:32px;
  `
      : ""}

  .overflowWrapper {
    height: 100%;
    overflow: ${(props) => (props.maximized ? "hidden" : "visible")};
    position: relative;
    pointer-events: none;
    ${(props) =>
      props.maximized
        ? `
    &:after {
      content: "";
      position: absolute;
      background-image: linear-gradient(
        to bottom,
        transparent calc(100% - 32px),
        white
      );
      height: 100%;
      width: 100%;
      bottom: 0;
      left: 0;
      right: 0;
    }
    `
        : ""}

    .tooltipContent {
      pointer-events: auto;
      max-height: calc(100vh - 64px);
      ${(props) =>
        props.maximized
          ? `
          ${CUSTOM_SCROLLBAR_CSS}
    `
          : "overflow: visible;"}

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
          props.maximized ? "1fr" : "5em"};
      grid-gap: 0.5em;
      position: relative;
      text-shadow: 0px 1px 4px white, 0px 1px 4px white, 0px 1px 4px white,
        0px 1px 4px white;
      .titleSection {
        text-align: left;
        display: grid;
        ${(props) =>
          props.isHorizontalLayout || props.maximized ? "" : "height: 1.5em;"}
        grid-template-rows: 1fr auto;
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
          &.atomCount .label {
            justify-self: right;
          }
          .label {
            color: hsl(0, 0%, 50%);
          }
        }
      }
      .imgWrapper {
        position: relative;
        background: ${(props) => (props.maximized ? "white" : "none")};
        max-height: 800px;
        max-width: 800px;
        margin: auto;
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
        background: white;
        ${(props) =>
          props.maximized && !props.isDesktopOrLarger
            ? `
      line-height: 1.5em;
      padding: 0.5em;
      `
            : ""}
        ${(props) =>
          props.maximized
            ? `
      padding-bottom: 32px;
      `
            : ""}
        .authors {
          font-style: italic;
          font-size: 0.8em;
          line-height: 1.5em;
        }
      }
    }
  }
`;

export default Tooltip;
