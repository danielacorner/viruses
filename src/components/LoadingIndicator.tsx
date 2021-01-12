import React from "react";
import { useStore } from "../store";
import styled from "styled-components/macro";

export const StyledDiv = styled.div``;
export function LoadingIndicator() {
  const loading = useStore((s) => s.loading);
  const started = useStore((s) => s.started);
  return started && loading ? (
    <StyledDiv
      css={`
        display: grid;
        place-items: center center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        pointer-events: none;
      `}
    >
      <p>hang tight! this could take a while...</p>
    </StyledDiv>
  ) : null;
}
