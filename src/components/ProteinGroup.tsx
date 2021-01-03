import React, { useEffect, useState } from "react";
import { useControl } from "react-three-gui";
import { SingleParticle } from "./Shapes/SingleParticle";
import { getRandStartPosition } from "./Shapes/particleUtils";
import { useStore } from "../store";

/** a set of proteins of the same species -- each species of protein can be rendered multiple times */
const ProteinGroup = (props) => {
  const numParticlesFloat: number = useControl(props.name, {
    group: "Particles",
    type: "number",
    min: 0,
    max: 20,
    value: 1,
  });
  const numParticles = Math.ceil(numParticlesFloat);

  const worldRadius = useStore((state) => state.worldRadius);

  const [positionsArray, setPositionsArray] = useState(() =>
    [...new Array(numParticles)].map(() => getRandStartPosition(worldRadius))
  );

  // change the positions array when numParticles changes;
  // do this manually so that existing particles don't re-render & maintain their positions
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
        getRandStartPosition(worldRadius)
      );
      setPositionsArray((prev) => [...prev, ...newPositionsArray]);
    }
  }, [numParticles, positionsArray, worldRadius]);

  return (
    <>
      {positionsArray.map((position) => (
        <SingleParticle
          key={JSON.stringify(position)}
          {...props}
          position={position}
        />
      ))}
    </>
  );
};

export default ProteinGroup;
