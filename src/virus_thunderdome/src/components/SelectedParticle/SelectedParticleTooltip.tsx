import React from "react";
import { useStore } from "../../store";
import styled from "styled-components/macro";
import { Close, Fullscreen, FullscreenExit } from "@material-ui/icons";
import {
  ClickAwayListener,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { startCase } from "lodash";
import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_MOBILE,
  BREAKPOINT_TABLET,
  CUSTOM_SCROLLBAR_CSS,
} from "../../utils/constants";

const TOOLTIP = {
  height: 442,
  width: 300,
};

const SelectedParticleTooltip = () => {
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
    <Tooltip title="maximize">
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
    </Tooltip>
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
        <ParticleImage
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : null}
      <div className="header">
        <BtnMaximize />
        <BtnClose />
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
      <div className="tooltipContent">
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
          <div className="imgWrapper">
            <ParticleImage />
          </div>
        )}
        <div className="pubmedAbstract">
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
  ${(props) =>
    props.maximized
      ? ""
      : `
        * {
          text-shadow:  0px -1px 4px white,
                      0px -1px 6px white,
                      0px -1px 8px white,
                      0px -1px 10px white,
                      0px -1px 12px white;
                      }
        `}
  @media (min-width: ${BREAKPOINT_MOBILE}px) {
    transform: unset;
  }
  position: fixed;
  ${(props) => (props.maximized ? "background: white;" : "")}
  bottom: ${(props) => (props.maximized ? 32 : 12)}px;
  left: ${(props) => (props.maximized ? 32 : 0)}px;
  ${(props) =>
    props.maximized
      ? `
    right:32px;
    top:32px;
  `
      : ""}

  .overflowWrapper {
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
    .header {
      z-index: 2;
      position: relative;
      .btnClose {
        position: absolute;
        top: 4px;
        right: 4px;
        z-index: 3;
      }
      .btnMaximize {
        position: absolute;
        top: 4px;
        right: 56px;
        z-index: 3;
      }
      ${(props) =>
        !props.maximized
          ? `
      .btnClose {
        top: -16px;
        right: 11px;
        background: #ffffff3b;
      }
      .btnMaximize {
        top: 78px;
        right: 12px;
      }
          `
          : ``}
      pointer-events: auto;
      box-sizing: border-box;
      text-align: left;
      display: grid;
      ${(props) =>
        props.isHorizontalLayout || props.maximized ? "" : "height: 1.5em;"}
      grid-template-rows: 1fr auto;
      align-content: end;
      align-items: center;
      ${(props) =>
        props.maximized
          ? `
        text-align: center;
        width: 100%;
        padding: 0.5em;
        background: white;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.31);
        `
          : `
          padding: 0 1em;
          `};
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

    .tooltipContent {
      ${CUSTOM_SCROLLBAR_CSS}
      pointer-events: auto;
      max-height: 90vh;
      ${(props) =>
        props.maximized
          ? `
          background: white;
    `
          : ""}
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
      grid-template-rows: ${(props) =>
          props.maximized && props.isHorizontalLayout ? 1.5 : 2}em ${(props) =>
          props.isHorizontalLayout ? "" : "auto "} ${(props) =>
          props.maximized ? "1fr" : "5em"};
      grid-gap: 0.5em;
      position: relative;
      text-shadow: 0px 1px 0px white, 0px 1px 0px white;

      .details {
        display: grid;
        height: fit-content;
        font-size: 0.8em;
        grid-template-columns: 1.5fr 0.6fr 1.5fr;

        ${(props) =>
          props.maximized
            ? `
            width: 100%;
    justify-items: center;
      `
            : `
        text-shadow:  0px -1px 4px white,
                      0px -1px 6px white,
                      0px -1px 8px white,
                      0px -1px 10px white,
                      0px -1px 12px white;
        `}
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
        z-index: 3;
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

export default SelectedParticleTooltip;
