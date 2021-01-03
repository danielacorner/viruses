import React, { useEffect, useState } from "react";
import { useControl } from "react-three-gui";
import { SingleParticle } from "./Shapes/SingleParticle";
import { getRandStartPosition } from "./Shapes/particleUtils";
import { useStore } from "../store";

const ProteinGroup = ({
  particle,
  particleName,
  interactive,
  pathToGLTF,
  pathToImage,
  numIcosahedronFaces,
  instanced = true,
  mass,
}) => {
  const numParticlesFloat: number = useControl(particleName, {
    group: "Particles",
    type: "number",
    min: 1,
    max: 100,
    value: 3,
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
          {...{
            position,
            pathToGLTF,
            pathToImage,
            numIcosahedronFaces,
            mass,
            interactive,
            ChildParticle: particle,
          }}
        />
      ))}
    </>
  );
};

export default ProteinGroup;
