import React from "react";
import { useStore } from "../../store";
import styled from "styled-components/macro";
import { Html } from "@react-three/drei";
import { useAtom } from "jotai";
import { scaleAtom } from "../../../../store";

export function FloatingHtmlOverlayCircle() {
  const selectedProtein = useStore((s) => s.selectedProtein);
  const [scale, setScale] = useAtom(scaleAtom);
  return selectedProtein ? (
    <Html>
      <CircleOutline radius={selectedProtein.radius * scale * 70} />
    </Html>
  ) : null;
}
const CircleOutline = styled.div`
  border: 2px solid #838383;
  box-sizing: border-box;
  background: white;
  border-radius: 50%;
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  margin-left: ${(props) => -props.radius}px;
  margin-top: ${(props) => -props.radius}px;
`;
