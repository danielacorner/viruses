import React, { useEffect, useRef } from "react";
import { LinearProgress } from "@material-ui/core";
import { useProgress } from "@react-three/drei";
import styled from "styled-components/macro";
import { render } from "react-dom";
import MemoryStats from "react-memorystats";

const StyledDiv = styled.div``;
export function LoadingIndicator() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  // show memorystats once we're done loading
  const alreadyRendered = useRef(false);
  useEffect(() => {
    if (progress === 100 && !alreadyRendered.current) {
      alreadyRendered.current = true;
      render(
        <MemoryStats corner="topLeft" />,
        document.querySelector("#memoryStats")
      );
    }
  }, [progress]);

  return errors.length > 0 ? (
    JSON.stringify(errors)
  ) : active ? (
    <>
      <StyledDiv
        css={`
          position: fixed;
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
        `}
      >
        <div>
          {loaded}/{total} models loaded
        </div>{" "}
        <div>loading asset: {item}</div>
      </StyledDiv>
      <LinearProgress variant="determinate" value={progress} />
    </>
  ) : null;
}

// function useInterval({ cb, interval }) {
//   useMount(() => {
//     const timer = window.setInterval(cb, interval);
//     return () => window.clearInterval(timer);
//   });
// }
