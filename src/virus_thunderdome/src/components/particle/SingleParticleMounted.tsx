import React, { useState } from "react";
import { SingleParticle } from "./SingleParticle";

export function SingleParticleMounted(props) {
  const [isMounted, setIsMounted] = useState(true);
  const unmount = () => setIsMounted(false);
  return isMounted ? (
    <SingleParticle
      {...{
        ...props,
        unmount,
      }}
    />
  ) : null;
}
