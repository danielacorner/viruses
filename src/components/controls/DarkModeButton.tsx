import { useAtom } from "jotai";
import { WbSunny, NightsStay } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { isDarkModeAtom } from "../../store";
import styled from "styled-components/macro";

const DarkModeButton = () => {
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

  return (
    <DarkModeButtonStyles {...{ isDarkMode }}>
      <Tooltip title={isDarkMode ? "Light Mode" : "Dark Mode"}>
        <IconButton onClick={() => setIsDarkMode((p) => !p)}>
          {isDarkMode ? <WbSunny /> : <NightsStay />}
        </IconButton>
      </Tooltip>
    </DarkModeButtonStyles>
  );
};

const DarkModeButtonStyles = styled.div`
  position: fixed;
  z-index: 20;
  top: 48px;
  right: 0px;
  height: 48px;
  width: 48px;
  .MuiButtonBase-root {
    color: hsla(0, 0%, ${(p) => (p.isDarkMode ? 100 : 0)}%, 0.5);
  }
  &:hover {
    .soundInfo {
      opacity: 0.8;
    }
  }
`;
export default DarkModeButton;
