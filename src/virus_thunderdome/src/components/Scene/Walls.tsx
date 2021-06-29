import React from "react";
import { useStore } from "../../store";
import { Plane } from "../Shapes/Plane";
import { PlayerHpBarAndFloor } from "../Game/PlayerHpBarAndFloor";
import { IcosahedronBackground } from "./IcosahedronBackground";

// https://www.npmjs.com/package/nice-color-palettes
// https://raw.githubusercontent.com/Jam3/nice-color-palettes/HEAD/visualize/1000.png
// const palette = niceColors[6]; // e.g. => [ "#69d2e7", "#a7dbd8", "#e0e4cc", "#f38630", "#fa6900" ]

export function Walls() {
  const worldRadius = useStore((state) => state.worldRadius);
  const ceilingHeight = useStore((state) => state.ceilingHeight);
  const walls = [
    {
      name: "in front",
      width: worldRadius * 2,
      height: ceilingHeight,
      rotation: [0 * Math.PI, 0, 0],
      position: [0, ceilingHeight / 2 - worldRadius, -worldRadius],
    },
    {
      reflect: true,
      name: "behind", // (camera-side)
      width: worldRadius * 2,
      height: ceilingHeight,
      rotation: [0, -1 * Math.PI, 0],
      position: [0, ceilingHeight / 2 - worldRadius, worldRadius],
    },
    {
      name: "left",
      width: worldRadius * 2,
      height: ceilingHeight,
      rotation: [0, 0.5 * Math.PI, 0],
      position: [-worldRadius, ceilingHeight / 2 - worldRadius, 0],
    },
    {
      name: "right",
      width: worldRadius * 2,
      height: ceilingHeight,
      rotation: [0, -0.5 * Math.PI, 0],
      position: [worldRadius, ceilingHeight / 2 - worldRadius, 0],
    },
    {
      name: "floor",
      width: worldRadius * 2,
      height: worldRadius * 2,
      rotation: [-0.5 * Math.PI, 0, 0],
      position: [0, -worldRadius, 0],
    },
    {
      name: "ceiling",
      width: worldRadius * 2,
      height: worldRadius * 2,
      rotation: [0.5 * Math.PI, 0, 0],
      position: [0, ceilingHeight - worldRadius, 0],
    },
  ];

  return (
    <>
      {walls.map((props, idx) => (
        <Plane {...props} key={JSON.stringify(props.position)} />
      ))}
      <IcosahedronBackground />
      <PlayerHpBarAndFloor
        {...{
          name: "floor",
          width: worldRadius * 2,
          height: worldRadius * 2,
          rotation: [-0.5 * Math.PI, 0, 0],
        }}
      />
    </>
  );
}
