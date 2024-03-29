import React, { useEffect, useState } from "react";
import {
  SingleParticle,
  useShouldRenderParticle,
} from "./Shapes/SingleParticle";
import { getRandPosition } from "./Shapes/particleUtils";
import { useStore } from "../store";
import { PROTEIN_TYPES } from "../utils/PROTEINS";

/** a set of proteins of the same species (each species of protein can be rendered multiple times) */
const ProteinGroup = (props) => {
  // const numParticlesFloat: number = useControl(props.name, {
  //   group: `Particles - ${props.type}`,
  //   type: "number",
  //   min: 0,
  //   max: props.type === PROTEIN_TYPES.antibody ? 100 : 20,
  //   value: 1,
  // });
  // const numParticles = Math.ceil(numParticlesFloat);
  const numParticles = 1;

  const worldRadius = useStore((state) => state.worldRadius);

  const [positionsArray, setPositionsArray] = useState(() =>
    [...new Array(numParticles)].map(() => getRandPosition(worldRadius))
  );

  useRenderOnlyNewParticlesWhenCreated(
    numParticles,
    positionsArray,
    setPositionsArray,
    worldRadius
  );
  const shouldRenderModel = useShouldRenderParticle(props.radius);

  return (
    <>
      {positionsArray.map((position) => (
        <SingleParticle
          key={JSON.stringify(position)}
          {...{ ...props, position, shouldRenderModel }}
        />
      ))}
    </>
  );
};

export default ProteinGroup;

/** change the positions array when numParticles changes;
 * do this manually so that existing particles don't re-render & maintain their positions
 */
function useRenderOnlyNewParticlesWhenCreated(
  numParticles: number,
  positionsArray: [number, number, number][],
  setPositionsArray: React.Dispatch<
    React.SetStateAction<[number, number, number][]>
  >,
  worldRadius: number
) {
  useEffect(() => {
    const numNewParticles = numParticles - positionsArray.length;

    if (numNewParticles < 0) {
      // slice off any excess,
      const newPositionsArray = positionsArray
        .slice(0, numParticles)
        .filter(Boolean);
      setPositionsArray(newPositionsArray);
    } else if (numNewParticles > 0) {
      // or populate any missing
      const newPositionsArray = [...new Array(numNewParticles)].map(() =>
        getRandPosition(worldRadius)
      );
      setPositionsArray((prev) => [...prev, ...newPositionsArray]);
    }
  }, [numParticles, positionsArray, worldRadius, setPositionsArray]);
}
