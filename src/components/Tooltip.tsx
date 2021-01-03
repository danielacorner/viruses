import React from "react";
import { useStore } from "../store";
import styled from "styled-components/macro";

const Tooltip = () => {
  const selectedProtein = useStore(({ selectedProtein }) => selectedProtein);
  return selectedProtein ? <TooltipStyles>hi</TooltipStyles> : null;
};

const TooltipStyles = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 300px;
  height: 300px;
`;

export default Tooltip;
