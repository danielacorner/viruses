import React from "react";
import { useStore } from "../../store";
import { ICONS } from "../Game/WAVES";
import { ANTIBODY_BTN_GAP } from "./CellAndAntibodyButtons";
import styled from "styled-components/macro";
import { animated } from "react-spring";
import Block from "@material-ui/icons/GpsFixedTwoTone";
import { Tooltip } from "@material-ui/core";
import { WAVES } from "../Game/WAVES";
export const ANTIBODY_BTN_WIDTH = 48;

export function AntibodyButtons({ springLeftRight, numAbTargets }) {
  return (
    <IconsWrapperStyles>
      <animated.div style={springLeftRight} className="blockIcon">
        <Block />
      </animated.div>
      <div className="label top">Antibodies</div>
      {[...Array(numAbTargets)].map((_, idx) => (
        <VirusTargetIconButton
          key={idx}
          {...{
            idx,
            numAbTargets,
          }}
        />
      ))}
    </IconsWrapperStyles>
  );
}

export function VirusTargetIconButton({ idx, numAbTargets }) {
  const Icon = ICONS[idx];
  const targetVirusIdx = useStore((s) => s.targetVirusIdx);
  const set = useStore((s) => s.set);
  const active = targetVirusIdx === idx;
  const buttonGap = ANTIBODY_BTN_GAP / numAbTargets;

  return (
    <Tooltip key={idx} title={WAVES[idx].antibody.name}>
      <VirusTargetIconStyles
        onClick={() => (active ? null : set({ targetVirusIdx: idx }))}
        className={`svgIcon${active ? " active" : ""}`}
        buttonGap={buttonGap}
        numAbTargets={numAbTargets}
        idx={idx}
      >
        <div className="container">
          <Icon />
        </div>
      </VirusTargetIconStyles>
    </Tooltip>
  );
}

export const VirusTargetIconStyles = styled.div`
  left: calc(
    50vw - ${ANTIBODY_BTN_WIDTH / 2}px -
      ${(p) => p.buttonGap * (-p.idx + (p.numAbTargets - 1) / 2)}px
  );
  position: absolute;
  bottom: 0px;
  border: 1px solid #737373;
  cursor: pointer;

  &.active {
    pointer-events: none;
    border: 1px solid #bbbbbb;
    box-shadow: 0px 2px 1px 1px #00000073;
  }
  box-shadow: 0px 2px 5px 1px #000000bd;
  border-radius: 16px;
  background: #68d0cb2e;
  width: ${ANTIBODY_BTN_WIDTH}px;
  height: ${ANTIBODY_BTN_WIDTH}px;

  .container {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    svg {
      width: 36px;
      height: 36px;
    }
  }
`;

export const IconsWrapperStyles = styled.div`
  position: relative;
  bottom: 112px;
  .blockIcon {
    pointer-events: none;
    bottom: 9px;
    z-index: 1;
    position: absolute;
    opacity: 0.4;
    svg {
      transform: scale(4);
    }
    color: red;
  }
`;
