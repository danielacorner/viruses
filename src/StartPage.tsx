import { Button, Typography } from "@material-ui/core";
import { CanvasAndSceneEmpty } from "./CanvasAndSceneEmpty";
import { useStore, scaleAtom, isDarkModeAtom } from "./store";
import { useAtom } from "jotai";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  getShouldRenderParticle,
  SingleParticle,
} from "./components/Shapes/SingleParticle";
import { ALL_PROTEINS } from "./utils/PROTEINS";
import styled from "styled-components/macro";

export function StartPage() {
  const set = useStore((s) => s.set);
  const r = useStore((s) => s.worldRadius);
  const [scale, setScale] = useAtom(scaleAtom);
  const worldRadius = useStore((s) => s.worldRadius);

  const [protein1, protein2, protein3] = ALL_PROTEINS.filter((p) =>
    getShouldRenderParticle(scale, p.radius, worldRadius)
  )
    .slice(0, 3)
    .map((p) => ({ ...p, shouldRenderModel: true }));
  const [isDarkMode] = useAtom(isDarkModeAtom);

  return (
    <ErrorBoundary boundaryTitle={"Start Page"}>
      <CanvasAndSceneEmpty isStartPage={true}>
        {protein1 && (
          <SingleParticle
            {...protein1}
            position={[-r * 0.08, r * 0.15, r * 0.6]}
          />
        )}
        {protein2 && (
          <SingleParticle {...protein2} position={[0, -r * 0.11, r * 0.5]} />
        )}
        {protein3 && (
          <SingleParticle
            {...protein3}
            position={[r * 0.11, r * 0.1, r * 0.7]}
          />
        )}
      </CanvasAndSceneEmpty>

      <StartPageStyles {...{ isDarkMode }}>
        <Typography style={{ textAlign: "center" }} variant="h3">
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
          <Typography variant="body2">Requirements: 40MB download</Typography>
        </div>
        <Button
          style={{
            padding: "0.25em 3em",
            pointerEvents: "auto",
          }}
          onClick={() => set({ started: true })}
          variant="contained"
          color="primary"
        >
          Explore the Terrarium 🔬
        </Button>

        <Button
          style={{
            padding: "0.25em 3em",
            pointerEvents: "auto",
            background: "hsl(0,0%,85%)",
          }}
          onClick={() => set({ startedThunderdome: true })}
          variant="outlined"
          color="primary"
        >
          🚧🏗👷‍♀️ Play Virus ⚡ Thunderdome
        </Button>
      </StartPageStyles>
    </ErrorBoundary>
  );
}

const StartPageStyles = styled.div`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  align-content: center;
  grid-gap: 1em;
  min-height: 100vh;
  button {
    text-transform: none;
  }
  color: ${(p) => (p.isDarkMode ? "white" : "black")};
`;
