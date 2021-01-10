import React from "react";
import { HTML, Line } from "@react-three/drei";
import { useStore } from "../store";

type Tick = {
  name: string;
  position: [number, number, number];
};

export function ScaleIndicator() {
  const wr = useStore((s) => s.worldRadius * 0.999);
  const scale = useStore((s) => s.scale);
  const commonProps = { color: "hsla(0,0%,80%)" };

  const ticks: Tick[] = [
    {
      name: "100 nm",
      position: [wr, (scale / 0.002) * wr, -wr],
    },
  ];

  return (
    <>
      <EdgeLines {...{ commonProps }} />

      <HTML {...{ position: [wr, wr * 1.25, -wr] }}>scale: {scale}</HTML>

      {ticks.map((t) => (
        <>
          <Line
            {...commonProps}
            points={[
              t.position,
              [t.position[0] * 0.95, t.position[1], t.position[2]],
            ]}
          ></Line>
          <HTML
            {...{
              position: [
                t.position[0] * 0.925,
                t.position[1] * 1.07,
                t.position[2],
              ],
              style: {
                whiteSpace: "nowrap",
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
