import React from "react";
import { TemperatureControls } from "./TemperatureControls";
import { PauseControls } from "./PauseControls";
import styled from "styled-components/macro";

const StyledDiv = styled.div``;
export default function BottomControls() {
  return (
    <StyledDiv
      css={`
        position: fixed;
        bottom: 16px;
        left: 30vw;
        right: 16px;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        grid-gap: 2em;
      `}
    >
      {/* <ShuffleControls /> */}
      <TemperatureControls />
      <PauseControls />
    </StyledDiv>
  );
}
// function ShuffleControls() {
//   const set = useStore((s) => s.set);
//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateRows: "auto auto",
//         alignItems: "center",
//       }}
//     >
//       <Typography style={{ color: "lightgrey" }}>Shuffle</Typography>
//       <IconButton
//         disabled={true}
//         onClick={() => set({ shuffled: Math.random() })}
//       >
//         <ShuffleOutlined />
//       </IconButton>
//     </div>
//   );
// }
