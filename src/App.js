import React, { Suspense, useEffect, useState } from "react";
import Tooltip from "./components/Tooltip";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import WarningOutlined from "@material-ui/icons/WarningOutlined";
import { CanvasAndSceneEmpty } from "./CanvasAndSceneEmpty";

function App() {
	return (
		<div className="App">
			<LazyLoadedScene />
			<div id="memoryStats"></div>
			<Tooltip />
		</div>
	);
}

export default App;

const CanvasAndSceneLazy = React.lazy(() => import("./CanvasAndScene"));

function LazyLoadedScene() {
	const [started, setStarted] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (started) {
			window.setTimeout(() => {
				setLoading(false);
			}, 20 * 1000);
		}
	}, [started]);

	return !started ? (
		<>
			<CanvasAndSceneEmpty />
			<div
				style={{
					pointerEvents: "none",
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "grid",
					placeItems: "center",
					alignContent: "center",
					gridGap: "1em",
					minHeight: "100vh",
				}}
			>
				<Typography variant="h3">
					Virus{" "}
					<span role="img" aria-label="">
						🦠
					</span>{" "}
					Terrarium
				</Typography>
				<div
					style={{
						display: "grid",
						gridAutoFlow: "column",
						placeItems: "center",
						gridGap: "0.25em",
					}}
				>
					<WarningOutlined />
					<Typography variant="body2">
						Requirements: 200MB download, 1GB memory
					</Typography>
				</div>
				<Button
					style={{ padding: "0.25em 3em", pointerEvents: "auto" }}
					onClick={() => setStarted(true)}
					variant="outlined"
				>
					Start
				</Button>
			</div>
		</>
	) : (
		<>
			{loading && <LinearProgress variant="indeterminate" />}
			<Suspense fallback={null}>
				<CanvasAndSceneLazy />
			</Suspense>
		</>
	);
}
