import React from "react";
import { Line, Text } from "@react-three/drei";
import { useStore } from "../store";

type Tick = {
  name: string;
  side: "left" | "right";
  position: [number, number, number];
};

export function ScaleIndicator() {
  const wr = useStore((s) => s.worldRadius * 0.999);
  const wd = 2 * wr;
  const scale = useStore((s) => s.scale);
  const worldRadius = useStore((s) => s.worldRadius);
  const commonProps = { color: "hsla(0,0%,80%)" };
  const scaled = scale / 0.002 / 4;
  // create 10 big ticks
  const ticksLeft: Tick[] = [...new Array(10)]
    .map((_, idx) => ({
      name: `${idx}000 Å`,
      position: [wr, idx * scaled * wd - wr, wr],
      side: "left",
    }))
    .slice(1) as Tick[];
  const ticksRight: Tick[] = [...new Array(10)]
    .map((_, idx) => ({
      name: `${idx}00 nm`,
      position: [wr, idx * scaled * wd - wr, wr],
      side: "right",
    }))
    .slice(1) as Tick[];

  // create 10 bigger ticks above the top tick
  const ticksLeftBig: Tick[] = [...new Array(scale < 0.0005 ? 10 : 0)]
    .map((_, idx) => ({
      name: `${idx}0000 Å`,
      position: [wr, idx * 10 * scaled * wd - wr, wr],
      side: "left",
    }))
    .slice(1) as Tick[];
  const ticksRightBig: Tick[] = [...new Array(scale < 0.0005 ? 10 : 0)]
    .map((_, idx) => ({
      name: `${idx}000 nm`,
      position: [wr, idx * 10 * scaled * wd - wr, wr],
      side: "right",
    }))
    .slice(1) as Tick[];

  // create 10 small ticks under the bottom tick
  const ticksLeftSmall: Tick[] = [...new Array(scale > 0.001 ? 10 : 0)]
    .map((_, idx) => ({
      name: `${idx}00 Å`,
      position: [wr, idx * 0.1 * scaled * wd - wr, wr],
      side: "left",
    }))
    .slice(1) as Tick[];
  const ticksRightSmall: Tick[] = [...new Array(scale > 0.001 ? 10 : 0)]
    .map((_, idx) => ({
      name: `${idx}0 nm`,
      position: [wr, idx * 0.1 * scaled * wd - wr, wr],
      side: "right",
    }))
    .slice(1) as Tick[];

  // create 10 smaller! ticks under the bottom tick
  const ticksLeftSmaller: Tick[] = [...new Array(scale > 0.001 ? 10 : 0)]
    .map((_, idx) => ({
      name: `${idx}0 Å`,
      position: [wr, idx * 0.01 * scaled * wd - wr, wr],
      side: "left",
    }))
    .slice(1) as Tick[];
  const ticksRightSmaller: Tick[] = [...new Array(scale > 0.001 ? 10 : 0)]
    .map((_, idx) => ({
      name: `${idx} nm`,
      position: [wr, idx * 0.01 * scaled * wd - wr, wr],
      side: "right",
    }))
    .slice(1) as Tick[];

  return (
    <>
      <EdgeLines {...{ commonProps }} />
      {/* TODO: compare virus radius to scale */}
      {[
        ...ticksLeft,
        ...ticksRight,
        ...ticksLeftBig,
        ...ticksRightBig,
        ...ticksLeftSmall,
        ...ticksRightSmall,
        ...ticksLeftSmaller,
        ...ticksRightSmaller,
      ].map((t) =>
        t.position[1] > worldRadius ||
        t.position[1] < -worldRadius * 0.97 ? null : (
          <React.Fragment key={t.name}>
            <group>
              <Line
                {...commonProps}
                points={[
                  t.position,
                  [
                    t.position[0] * (t.side === "left" ? 0.95 : 1),
                    t.position[1],
                    t.position[2] * (t.side === "right" ? 0.95 : 1),
                  ],
                ]}
              ></Line>
              <Text
                rotation={[0, t.side === "left" ? 0 : Math.PI / 2, 0]}
                {...{
                  position: [
                    t.position[0] * (t.side === "left" ? 0.91 : 1),
                    t.position[1],
                    t.position[2] * (t.side === "right" ? 0.91 : 1),
                  ],
                  // color: t.side === "left" ? "hsl(0,0%,0%)" : "hsl(0,0%,70%)",
                  color: "hsl(0,0%,0%)",
                  fontSize: 0.1,
                  style: {
                    whiteSpace: "nowrap",
                    width: 0,
                    display: "flex",
                    justifyContent: "flex-end",
                  },
                }}
              >
                {t.name}
              </Text>
            </group>
          </React.Fragment>
        )
      )}
    </>
  );
}
function EdgeLines({ commonProps }) {
  const wr = useStore((s) => s.worldRadius * 0.999);

  return (
    <>
      <Line
        {...commonProps}
        //  right bottom
        points={[
          [wr, -wr, -wr],
          [wr, -wr, wr],
        ]}
      ></Line>

      <Line
        {...commonProps}
        //  front bottom
        points={[
          [-wr, -wr, wr],
          [wr, -wr, wr],
        ]}
      ></Line>

      <Line
        {...commonProps}
        //  front right vertical
        points={[
          [wr, -wr, wr],
          [wr, wr, wr],
        ]}
      ></Line>
    </>
  );
}
