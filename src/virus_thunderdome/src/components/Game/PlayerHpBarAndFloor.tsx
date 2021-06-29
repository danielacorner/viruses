import React from "react";
import { INITIAL_PLAYER_HP, useStore } from "../../store";
import { PROTEINS } from "../../utils/PROTEINS";
import { usePlane } from "@react-three/cannon";
import { Html } from "@react-three/drei";
import styled from "styled-components/macro";

export function PlayerHpBarAndFloor({
  width,
  height,
  widthSegments = 1,
  heightSegments = 1,
  reflect = false,
  ...rest
}) {
  const set = useStore((s) => s.set);
  const worldRadius = useStore((s) => s.worldRadius);
  const playerHp = useStore((s) => s.playerHp);

  const [ref] = usePlane(() => ({
    // rotation: [-Math.PI / 2, 0, 0],
    ...rest,
    position: [0, -worldRadius, 0],
    onCollide: (event) => {
      const { body: collidingBody } = event as any;
      // if it's hit by a virus... derease hp
      const virusCollisionTarget =
        collidingBody?.name &&
        PROTEINS.viruses.find((v) => v.name === collidingBody.name);
      if (virusCollisionTarget) {
        console.log(
          "🌟🚨 ~ const[ref]=usePlane ~ virusCollisionTarget.radius",
          virusCollisionTarget.radius
        );
        set({ playerHp: Math.max(0, playerHp - virusCollisionTarget.radius) });
      }
    },
  }));

  const playerHpPct = playerHp / INITIAL_PLAYER_HP;
  return (
    <mesh ref={ref}>
      <planeGeometry
        attach="geometry"
        args={[width, height, widthSegments, heightSegments]}
      />
      <Html>
        <HPIndicatorStyles
          {...{
            playerHpPct,
            background: `hsl(${Math.round(playerHpPct * 100)}, 50%, 50%)`,
          }}
        >
          <div className="hpBar">
            <div className="hp" />
            {playerHpPct === 0 ? "😢" : ""}
          </div>
        </HPIndicatorStyles>
      </Html>
    </mesh>
  );
}

export const HPIndicatorStyles = styled.div`
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 0;
  margin-top: 6px;
  .hpBar {
    width: calc(10vw + 240px);
    height: 8px;
    outline: 1px solid grey;
    .hp {
      width: 100%;
      height: 100%;
      opacity: 0.8;
      background: ${(p) => p.background};
      transition: transform 300ms linear;
      transform: scaleX(${(p) => p.playerHpPct});
      transform-origin: left;
    }
  }
`;
