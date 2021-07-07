import { useAtom } from "jotai";
import { WbSunny, NightsStay } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import { isDarkModeAtom, useStore } from "../../store";
import styled from "styled-components/macro";

const DarkModeButton = () => {
	const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);
	const selectedProtein = useStore((s) => s.selectedProtein);

	return selectedProtein ? null : (
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
	bottom: 6px;
	left: 6px;
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
