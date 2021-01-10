import React from "react";
import { HTML, Line } from "@react-three/drei";
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
  const commonProps = { color: "hsla(0,0%,80%)" };
  const scaled = scale / 0.002 / 4;
  // create 10 big ticks, and 10 small ticks under the the bottom tick
  const ticksLeft: Tick[] = [...new Array(10)]
    .map((_, idx) => ({
      name: `${idx}000 Å`,
      position: [wr, idx * scaled * wd - wr, -wr],
      side: "left",
    }))
    .slice(1) as Tick[];
  const ticksRight: Tick[] = [...new Array(10)]
    .map((_, idx) => ({
      name: `${idx}00 nm`,
      position: [wr, idx * scaled * wd - wr, -wr],
      side: "right",
    }))
    .slice(1) as Tick[];
  // [
  //   {
  //     name: "3000 Å",
  //     position: [wr, 3 * scaled * wd - wr, -wr],
  //   },
  //   {
  //     name: "2000 Å",
  //     position: [wr, 2 * scaled * wd - wr, -wr],
  //   },
  //   {
  //     name: "1000 Å",
  //     position: [wr, 1 * scaled * wd - wr, -wr],
  //   },
  //   {
  //     name: "100 Å",
  //     position: [wr, 0.2 * scaled * wd - wr, -wr],
  //   },
  // ];

  return (
    <>
      <EdgeLines {...{ commonProps }} />

      <HTML {...{ position: [wr, wr * 1.25, -wr] }}>scale: {scale}</HTML>

      {/* TODO: compare virus radius to scale */}
      {[...ticksLeft, ...ticksRight].map((t) => (
        <>
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
          <HTML
            {...{
              position: [
                t.position[0] * (t.side === "left" ? 0.925 : 1.175),
                t.position[1] * 1.07,
                t.position[2],
              ],
              style: {
                whiteSpace: "nowrap",
                ...(t.side === "left" ? {} : { color: "hsl(0,0%,50%)" }),
                width: 0,
                display: "flex",
                justifyContent: "flex-end",
              },
            }}
          >
            {t.name}
          </HTML>
        </>
      ))}
    </>
  );
}
function EdgeLines({ commonProps }) {
  const wr = useStore((s) => s.worldRadius * 0.999);

  return (
    <>
      <Line
        {...commonProps}
        points={[
          [wr, -wr, -wr],
          [-wr, -wr, -wr],
        ]}
      ></Line>

      <Line
        {...commonProps}
        points={[
          [wr, -wr, -wr],
          [wr, -wr, wr],
        ]}
      ></Line>

      <Line
        {...commonProps}
        points={[
          [wr, -wr, -wr],
          [wr, wr, -wr],
        ]}
      ></Line>
    </>
  );
}
