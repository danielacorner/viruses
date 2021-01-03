import React, { useState } from "react";
import { useStore } from "../store";
import styled from "styled-components/macro";
import { Close, Fullscreen, FullscreenExit } from "@material-ui/icons";
import { IconButton, Typography } from "@material-ui/core";
import { useWindowSize } from "../utils/hooks";

const Tooltip = () => {
	const selectedProtein = useStore(({ selectedProtein }) => selectedProtein);
	const set = useStore(({ set }) => set);
	console.log("🌟🚨 ~ Tooltip ~ selectedProtein", selectedProtein);
	const [maximized, setMaximized] = useState(false);
	const windowSize = useWindowSize();
	console.log("🌟🚨: Tooltip -> selectedProtein", selectedProtein);
	return selectedProtein ? (
		<TooltipStyles
			maximized={maximized}
			height={maximized ? Math.min(windowSize.width, windowSize.height) : 300}
		>
			<div className="tooltipContent">
				<IconButton
					className="btnClose"
					onClick={() => {
						setMaximized(false);
						set({ selectedProtein: null });
					}}
				>
					<Close />
				</IconButton>
				<IconButton
					className="btnMaximize"
					onClick={() => setMaximized((prev) => !prev)}
				>
					{maximized ? <FullscreenExit /> : <Fullscreen />}
				</IconButton>
				<div className="title">
					<a
						href={selectedProtein.PDBUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						<Typography variant="h6">{selectedProtein.name}</Typography>
					</a>
				</div>
				<img src={selectedProtein.pathToImage} alt="" />
			</div>
		</TooltipStyles>
	) : null;
};

const TooltipStyles = styled.div`
	opacity: ${(props) => (props.maximized ? 0.95 : 0.7)};
	position: fixed;
	bottom: 0;
	left: 0;
	width: ${(props) => props.height}px;
	height: ${(props) => props.height}px;
	background: black;
	.tooltipContent {
		height: 100%;
		position: relative;
		.title {
			color: white;
		}
		button {
			position: absolute;
			color: white;
		}
		.btnMaximize {
			top: 0;
			right: 32px;
		}
		.btnClose {
			top: 0;
			right: 0;
		}
		img {
			height: 100%;
			width: auto;
		}
	}
`;

export default Tooltip;
