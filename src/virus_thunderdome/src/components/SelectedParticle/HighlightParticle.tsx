import React from "react";
import { useStore } from "../../store";
import styled from "styled-components/macro";
import { HTML } from "@react-three/drei";

export function HighlightParticle() {
  const selectedProtein = useStore((s) => s.selectedProtein);
  const scale = useStore((s) => s.scale);
  return selectedProtein ? (
    <HTML>
      <CircleOutline radius={selectedProtein.radius * scale * 70} />
    </HTML>
  ) : null;
}
const CircleOutline = styled.div`
  border: 2px solid #ff4775;
  box-sizing: border-box;
  border-radius: 50%;
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  margin-left: ${(props) => -props.radius}px;
  margin-top: ${(props) => -props.radius}px;
`;
