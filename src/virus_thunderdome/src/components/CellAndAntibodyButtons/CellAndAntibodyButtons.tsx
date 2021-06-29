import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { useCellsFiltered } from "../useCellsFiltered";
import styled from "styled-components/macro";
import { randBetween } from "../../utils/utils";
import { useSpring, animated } from "react-spring";
import { AntibodyButtons, ANTIBODY_BTN_WIDTH } from "./AntibodyButtons";
import { Button, Tooltip } from "@material-ui/core";

export const ANTIBODY_BTN_GAP = 240;
export const CELLS_GAP = 3.4;
const CELL_BTN_WIDTH = 72;

export function CellAndAntibodyButtons() {
  const cellsFiltered = useCellsFiltered();
  const numCells = cellsFiltered.length;
  const targetVirusIdx = useStore((s) => s.targetVirusIdx);
  const started = useStore((s) => s.started);
  const absButtonGap = ANTIBODY_BTN_GAP / numCells;

  const springLeftRight = useSpring({
    left: `calc(
      50vw - ${ANTIBODY_BTN_WIDTH / 4}px -
        ${absButtonGap * (-targetVirusIdx + (numCells - 1) / 2)}px
    )`,
    config: {
      tension: 270,
      mass: 0.7,
      friction: 17,
    },
  });

  const cellsBtnGap = CELLS_GAP * 5;
  const totalButtonsGap = Math.max(0, cellsBtnGap * (numCells - 1));
  const totalButtonsWidth = CELL_BTN_WIDTH * numCells + totalButtonsGap;

  const currentWaveIdx = useStore((s) => s.currentWaveIdx);
  const isWaveComplete = useStore((s) => s.isWaveComplete);
  const numAbTargets = currentWaveIdx + (isWaveComplete ? 1 : 0);

  return !started ? null : (
    <Styles
      {...{
        numAbTargets,
        absButtonGap,
        cellsOffsetLeft: -totalButtonsWidth / 2,
      }}
    >
      <AntibodyButtons
        springLeftRight={springLeftRight}
        numAbTargets={numAbTargets}
      />
      <div className="label bottom">Immune Cells</div>

      <AllCellButtons />
    </Styles>
  );
}
function AllCellButtons() {
  const cellsFiltered = useCellsFiltered();
  const numCells = cellsFiltered.length;
  return (
    <CellButtonsStyles>
      {cellsFiltered.map((cell, idx) => (
        <CellButton
          key={idx}
          {...{
            idx,
            numCells,
            cell,
          }}
        />
      ))}
    </CellButtonsStyles>
  );
}

const CellButtonsStyles = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 23px;
  width: 100vw;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 108px;
  pointer-events: none;
  place-items: center;
  justify-content: center;
  button {
    pointer-events: auto;
  }
`;

const Styles = styled.div`
  .label {
    pointer-events: none;
    position: fixed;
    transform: rotate(312deg);
    height: 1em;
    bottom: 128px;
    left: calc(
      50vw - ${88}px - ${(p) => p.absButtonGap * ((p.numAbTargets - 1) / 2)}px
    );
    display: grid;
    place-items: center;
    font-size: 14px;
    &.bottom {
      bottom: 58px;
      width: 8ch;
      left: calc(50vw - ${64}px + ${(p) => p.cellsOffsetLeft}px);
    }
  }
`;

const SPEED = 150;

export const SHOT_TYPES = [
  {
    absPerShot: 1,
    speed: 1 / SPEED,
    // quality: 1 / 1 == 1,
    getPosition: (worldRadius) => {
      // first cell: spawns at completely random x z in the lower y section
      const jitter = 1 * worldRadius;
      const x = randBetween(-jitter, jitter);
      const z = randBetween(-jitter, jitter);
      const y =
        -worldRadius + randBetween(worldRadius * 0.1, worldRadius * 0.5);
      return [x, y, z];
    },
  },
  {
    absPerShot: 6,
    speed: 1 / (SPEED * 5.5),
    // quality: 6 / 5.5 == 1.09,
    getPosition: (worldRadius) => {
      // second cell: shoots up quickly
      // (spawns at smaller random x z in y=bottom, intersecting with floor to cause immediate jump)
      const jitter = 0.25 * worldRadius;
      const x = randBetween(-jitter, jitter);
      const z = randBetween(-jitter, jitter);
      const y = -worldRadius;
      return [x, y, z];
    },
  },
  {
    absPerShot: () => (Math.random() > 0.5 ? 2 : 1),
    speed: 1 / (SPEED * 1.2),
    // quality: 1.5 / 1.2 == 1.25,
    getPosition: (worldRadius) => {
      // third cell: spawns in the corners => shoots towards the center
      const x =
        worldRadius * (Math.random() > 0.5 ? 1 : -1) + randBetween(-0.1, 0.1);
      const z =
        worldRadius * (Math.random() > 0.5 ? 1 : -1) + randBetween(-0.1, 0.1);
      const y = -worldRadius + randBetween(-0.1, 0.1);
      return [x, y, z];
    },
  },
  {
    absPerShot: 3,
    speed: 1 / (SPEED * 2),
    // quality: 3 / 2 == 1.5,
    getPosition: (worldRadius) => {
      const jitter = 0.3 * worldRadius;
      const x = randBetween(-jitter, jitter);
      const z = randBetween(-jitter, jitter);
      const y = -worldRadius + randBetween(0, -0.1 * worldRadius);
      return [x, y, z];
    },
  },
];

function CellButton({ idx, numCells, cell }) {
  const [enabled, setEnabled] = useState(true);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const cellButtonIdx = useStore((s) => s.cellButtonIdx);
  const isPropertyAnimating = useStore((s) => s.isPropertyAnimating);
  const set = useStore((s) => s.set);

  const { speed } = SHOT_TYPES[cellButtonIdx];

  // disable button on pointerup so we can't spam clicks
  useEffect(() => {
    if (!enabled) {
      setTimeout(() => {
        setEnabled(true);
      }, 1 / speed);
    }
  }, [enabled, speed]);

  const disabled = isPropertyAnimating || !enabled;
  const springY = useSpring({
    transform: `scale(${isPointerDown ? 1.01 : 1}) translateY(${
      isPointerDown ? 6 : disabled ? 3 : 0
    }px)`,
    config: { mass: 1, tension: 340, friction: 14 },
  });
  return (
    <Tooltip title={cell.name}>
      <StyledCellButton
        style={springY}
        disabled={disabled}
        speed={speed}
        className={disabled ? "disabled" : isPointerDown ? "active" : ""}
        {...{ idx, numCells }}
        onPointerDown={() => {
          set({ pointerDownStartTime: Date.now() });
          set({ cellButtonIdx: idx });
          setIsPointerDown(true);
        }}
        onPointerLeave={() => setIsPointerDown(false)}
        onPointerUp={() => {
          setEnabled(false);
          setIsPointerDown(false);
          set({ pointerDownStartTime: null });
          set({ absCreatedSincePointerDown: 0 });
        }}
      />
    </Tooltip>
  );
}

const StyledCellButton = styled(animated(Button))`
  cursor: pointer;
  border: 1px solid #737373;
  box-shadow: 0px 2px 2px 1px #000000bd;
  border-radius: 16px !important;
  z-index: 1;
  width: ${CELL_BTN_WIDTH}px;
  height: ${CELL_BTN_WIDTH}px;
  background: #68d0cb2e;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: -12px;
    bottom: -12px;
    right: 0;
    left: 0;
    background: #70908f;
    opacity: ${(p) => (p.disabled ? 0.7 : 0.1)};
    transition: none;
    transform-origin: bottom;
    transform: scaleY(${(p) => (p.disabled ? 0 : 1)});
    transition: all ${(p) => (p.disabled ? 0 : 1 / p.speed)}ms linear;
  }
  /* opacity: ${(p) => (p.disabled ? 0.5 : 1)}; */
  &:hover:before {
    background: #8ce5e3;
  }
  &.active {
    box-shadow: 0px 2px 1px 1px #000000bd;
  }
`;
