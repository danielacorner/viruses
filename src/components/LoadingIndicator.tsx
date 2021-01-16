import React, { useEffect, useRef } from "react";
import { LinearProgress } from "@material-ui/core";
import { useProgress } from "@react-three/drei";
import styled from "styled-components/macro";
// import { render } from "react-dom";
// import MemoryStats from "react-memorystats";

export function LoadingIndicator() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  // // show memorystats once we're done loading
  // const alreadyRendered = useRef(false);
  // useEffect(() => {
  //   if (
  //     process.env.NODE_ENV === "development" &&
  //     progress === 100 &&
  //     !alreadyRendered.current
  //   ) {
  //     alreadyRendered.current = true;
  //     render(
  //       <MemoryStats corner="topLeft" />,
  //       document.querySelector("#memoryStats")
  //     );
  //   }
  // }, [progress]);

  return errors.length > 0 ? (
    <div
      style={{ maxWidth: "100vw", wordBreak: "break-all", padding: "0 6em" }}
    >
      {JSON.stringify(errors)}
    </div>
  ) : active ? (
    <>
      <LoadingIndicatorStyles>
        <div>
          {loaded}/{total} models loaded
        </div>{" "}
        <div>loading asset: {item}</div>
      </LoadingIndicatorStyles>
      <LinearProgress
        {...(loaded === 0
          ? { variant: "indeterminate" }
          : { variant: "determinate", value: progress })}
      />
    </>
  ) : null;
}

const LoadingIndicatorStyles = styled.div`
  position: fixed;
  max-width: 100vw;
  top: 4px;
  width: fit-content;
  left: 0;
  right: 0;
  display: grid;
  place-items: end;
  place-content: center;
  z-index: 999;
  grid-template-columns: 20vw auto;
  grid-gap: 10vw;
`;

// function useInterval({ cb, interval }) {
//   useMount(() => {
//     const timer = window.setInterval(cb, interval);
//     return () => window.clearInterval(timer);
//   });
// }
