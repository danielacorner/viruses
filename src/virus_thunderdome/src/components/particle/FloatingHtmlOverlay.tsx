import React, { useEffect, useState } from "react";
import { useMount } from "../../utils/utils";
import { Html } from "@react-three/drei";
import styled from "styled-components/macro";
import { PROTEIN_TYPES } from "../../utils/PROTEINS";
import { useStore } from "../../store";
import { ICONS } from "../Game/WAVES";
import Block from "@material-ui/icons/GpsFixed";
import { useScalePercent } from "../useScalePercent";
import { useSpring, animated } from "react-spring";

export function FloatingHtmlOverlay({
  name,
  lifespan,
  type,
  virusHpPct,
  iconIdx = null,
}) {
  const Icon = iconIdx || iconIdx === 0 ? ICONS[iconIdx] : null;
  const showHp = useStore((s) => s.showHp);
  const [mounted, setMounted] = useState(false);
  useMount(() => {
    setTimeout(() => {
      // timeout to ensure bar starts 100% width
      setMounted(true);
    }, 1);
  });
  const isAntibody = type === PROTEIN_TYPES.antibody;
  const isVirus = type === PROTEIN_TYPES.virus;
  const scalePct = useScalePercent();

  // when virusHp changes, highlight the particle
  const springDamageAnimation = useSpringDamageAnimation(isVirus, virusHpPct);

  return showHp ? (
    <Html>
      <HtmlOverlayStyles
        {...{
          mounted,
          lifespan,
          type,
          virusHpPct,
          isAntibody,
          isVirus,
          scalePct,
        }}
      >
        <animated.div
          className="damageAnimation"
          style={springDamageAnimation}
        />
        {Icon ? (
          <div className="icon">
            <Icon />
            {isAntibody ? (
              <div className="blockIcon">
                <Block />
              </div>
            ) : null}
          </div>
        ) : null}
        {/* <div className="name">{name}</div> */}
        <div className="hpBar">
          <div className="hp" />
        </div>
      </HtmlOverlayStyles>
    </Html>
  ) : null;
}

type HtmlOverlayProps = {
  type: keyof typeof PROTEIN_TYPES;
  virusHpPct: number;
  lifespan: number;
  mounted: boolean;
  isVirus: boolean;
  isAntibody: boolean;
  scalePct: number;
};

const HP_BAR_WIDTH = 50;
const HP_BAR_HEIGHT = 5;

const DAMAGE_ANIMATION_WIDTH = HP_BAR_WIDTH * 1.2;
const DAMAGE_ANIMATION_HEIGHT = DAMAGE_ANIMATION_WIDTH;

const SVG_TOP = -40;

const HtmlOverlayStyles = styled.div<HtmlOverlayProps>`
  .damageAnimation {
    position: absolute;
    width: ${DAMAGE_ANIMATION_WIDTH}px;
    height: ${DAMAGE_ANIMATION_HEIGHT}px;
    border-radius: 50%;
    top: ${-DAMAGE_ANIMATION_HEIGHT / 2 + HP_BAR_HEIGHT / 2 + SVG_TOP / 2}px;
    bottom: 0;
    left: ${-DAMAGE_ANIMATION_WIDTH / 2}px;
    right: 0;
    background: radial-gradient(
      circle,
      rgba(214, 7, 7, 1) 0%,
      rgba(209, 66, 66, 0.8) 25%,
      rgba(209, 66, 66, 0.5) 50%,
      rgba(209, 66, 66, 0.2) 75%,
      rgba(255, 21, 0, 0) 100%
    );
  }
  .icon {
    width: 100%;
    height: 100%;
    svg {
      position: absolute;
      top: ${SVG_TOP}px;
      right: -16px;
      width: 32px;
      height: 32px;
    }
    .blockIcon {
      opacity: 0.3;
      svg {
        transform: scale(1.6);
      }
      color: red;
    }
  }
  transform: translateY(16px)
    scale(
      ${(p) => (p.isAntibody ? 0.9 : p.isVirus ? 1.5 : 1) * p.scalePct ** 0.2}
    );
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 0;
  .name {
    font-size: 8px;
    font-weight: bold;
    white-space: nowrap;
    text-shadow: 0px 0px 2px white, 0px 0px 6px white;
    padding-bottom: 0.5em;
    text-align: center;
  }
  .hpBar {
    width: ${HP_BAR_WIDTH}px;
    height: ${HP_BAR_HEIGHT}px;
    outline: 1px solid grey;
    .hp {
      width: 100%;
      height: 100%;
      background: ${(p) =>
        p.type === PROTEIN_TYPES.antibody
          ? "cornflowerblue"
          : p.type === PROTEIN_TYPES.virus
          ? "limegreen"
          : "none"};
      transition: transform ${(p) => p.lifespan}ms linear;
      transform: scaleX(
        ${(p) => {
          return p.type === PROTEIN_TYPES.antibody && p.mounted
            ? 0
            : p.type === PROTEIN_TYPES.virus && p.virusHpPct
            ? p.virusHpPct
            : 1;
        }}
      );
      transform-origin: left;
    }
  }
`;

/** when virusHp changes, highlight the particle */
function useSpringDamageAnimation(isVirus: boolean, virusHpPct: any) {
  const [highlighted, setHighlighted] = useState(false);
  useEffect(() => {
    let timer;
    if (isVirus && virusHpPct !== 1) {
      setHighlighted(true);
      timer = setTimeout(() => {
        setHighlighted(false);
      }, 200);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [virusHpPct, isVirus]);

  const springDamageAnimation = useSpring({
    opacity: highlighted ? 1 : 0,
    immediate: highlighted,
  });
  return springDamageAnimation;
}
