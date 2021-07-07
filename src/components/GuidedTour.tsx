import { IconButton, Tooltip, Badge } from "@material-ui/core";
import { GitHub, Help } from "@material-ui/icons";
import React, { useState } from "react";
import Tour from "reactour";
import styled from "styled-components/macro";
import { getIsTouchDevice } from "../getIsTouchDevice";
import { isDarkModeAtom, useStore } from "../store";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
const isFirstVisitAtom = atomWithStorage("isFirstVisit", true);

const GuidedTour = () => {
	// only show once we've started
	const started = useStore((s) => s.started);
	// show the tour if it's our first time visiting the app
	const [isFirstVisit, setIsFirstVisit] = useAtom(isFirstVisitAtom);
	const [isTourOpen, setIsTourOpen] = useState(false);
	const [isDarkMode] = useAtom(isDarkModeAtom);

	return !started ? null : (
		<>
			<Tour
				steps={TOUR_STEPS}
				isOpen={isTourOpen}
				onRequestClose={() => {
					setIsTourOpen(false);
					setIsFirstVisit(false);
				}}
				badgeContent={(curr, tot) => `${curr}/${tot}`}
			/>

			<ButtonStartTour {...{ setIsTourOpen, isFirstVisit, isDarkMode }} />
			{/* <LinkToGithub /> */}
			<InitialTerrariumPositionStyles />
			<FullScreenPositionStyles />
		</>
	);
};

export default GuidedTour;

function LinkToGithub() {
	const selectedProtein = useStore((s) => s.selectedProtein);
	return (
		<a
			href="https://github.com/danielacorner/viruses"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Tooltip title="GitHub repository">
				<IconButton
					className="githubLink"
					size="small"
					style={{
						position: "fixed",
						opacity: selectedProtein ? 0.2 : 0.6,
						bottom: 16,
						left: 16,
						transform: "scale(0.9)",
					}}
				>
					<GitHub />
				</IconButton>
			</Tooltip>
		</a>
	);
}
function ButtonStartTour({ setIsTourOpen, isFirstVisit, ...props }) {
	return (
		<ButtonStartTourStyles {...props}>
			<Tooltip title="Tour">
				<IconButton size="small" onClick={() => setIsTourOpen(true)}>
					<Badge badgeContent={isFirstVisit ? 1 : null} color="error">
						<Help />
					</Badge>
				</IconButton>
			</Tooltip>
		</ButtonStartTourStyles>
	);
}
const ButtonStartTourStyles = styled.div`
	position: fixed;
	top: 0.5em;
	left: 0.5em;
	.MuiSvgIcon-root {
		color: hsla(0, 0%, ${(p) => (p.isDarkMode ? 100 : 0)}%, 0.5);
	}
`;

const SQUARE_WIDTH = 700;
/** a square window to highlight the virus-containing cube's initial position */
export const FullScreenPositionStyles = styled.div`
	pointer-events: none;
	position: fixed;
	top: 32px;
	bottom: 32px;
	left: 32px;
	right: 32px;
`;
/** a square window to highlight the draggable area */
export const InitialTerrariumPositionStyles = styled.div`
	pointer-events: none;
	position: fixed;
	top: 50vh;
	left: 50vw;
	margin-top: -${SQUARE_WIDTH / 2}px;
	margin-left: -${SQUARE_WIDTH / 2}px;
	width: ${SQUARE_WIDTH}px;
	height: ${SQUARE_WIDTH}px;
`;

const TOUR_STEPS = [
	{
		selector: "[class*='ButtonStartTourStyles']",
		content: () => (
			<div>
				<p>Hey, welcome! 👋</p>
				<p>
					This app visualizes 3D model and mass data from{" "}
					<div>
						<a
							style={{ textDecoration: "none" }}
							href="https://www.rcsb.org/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Protein Databank 🦠
						</a>
					</div>
				</p>
			</div>
		),
	},
	{
		selector: "[class*='ScaleControlsStyles']",
		content: () => (
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "3em auto",
				}}
			>
				<p>🔬⚛</p>
				<div>When you change the scale, different particles come into view</div>
			</div>
		),
	},
	{
		selector: "[class*='BottomControls']",
		content: () => (
			<div>
				<p>Control the temperature 🔥</p>
				<div>or pause ⏸ the simulation </div>
			</div>
		),
	},
	{
		selector: "[class*='InitialTerrariumPositionStyles']",
		content: () => {
			const isTouchDevice = getIsTouchDevice();
			return (
				<div style={{ lineHeight: "1.6em", textAlign: "center" }}>
					<div>👆➡</div>
					<div>Drag to orbit, </div>
					<div>{isTouchDevice ? "Pinch" : "Scroll"} to zoom, </div>
					<div>
						{isTouchDevice ? "Two-finger-drag" : "Right-click-drag"} to move.
					</div>
					<div>
						{isTouchDevice ? "Tap" : "Click"} a particle to learn more about it!
					</div>
				</div>
			);
		},
	},
	// {
	//   selector: ".githubLink",
	//   content: () => {
	//     return (
	//       <div style={{ lineHeight: "1.6em", fontSize: "0.9em" }}>
	//         <h2>Special Thanks</h2>
	//         <p>
	//           I started this project when{" "}
	//           <a
	//             href="https://www.theskepticsguide.org/"
	//             target="_blank"
	//             rel="noopener noreferrer"
	//           >
	//             The Skeptic's Guide podcast
	//           </a>{" "}
	//           announced that{" "}
	//           <a
	//             href="https://deepmind.com/blog/article/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology"
	//             target="_blank"
	//             rel="noopener noreferrer"
	//           >
	//             DeepMind's AlphaFold had essentially solved the protein folding
	//             problem
	//           </a>{" "}
	//           and a new era of biotechnology was about to be unlocked.
	//         </p>
	//         <p>
	//           Protein physics inspired by{" "}
	//           <a
	//             href="https://www.youtube.com/watch?v=VdmbpAo9JR4"
	//             target="_blank"
	//             rel="noopener noreferrer"
	//           >
	//             The Inner Life of the Cell - Protein Packing
	//           </a>{" "}
	//           by{" "}
	//           <a
	//             href="http://biovisions.mcb.harvard.edu/"
	//             target="_blank"
	//             rel="noopener noreferrer"
	//           >
	//             BioVisions at Harvard University
	//           </a>
	//         </p>
	//         <p>
	//           This project is open source,{" "}
	//           <a
	//             href="https://github.com/danielacorner/viruses"
	//             target="_blank"
	//             rel="noopener noreferrer"
	//           >
	//             you can find the code here
	//           </a>
	//           .
	//         </p>
	//         <p>
	//           Cheers! <span role="img">🍻</span>
	//         </p>
	//       </div>
	//     );
	//   },
	// },
];
