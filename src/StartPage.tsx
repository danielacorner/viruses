import { Button, Typography } from "@material-ui/core";
import { CanvasAndSceneEmpty } from "./CanvasAndSceneEmpty";
import { useStore } from "./store";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  getShouldRenderParticle,
  SingleParticle,
} from "./components/Shapes/SingleParticle";
import { ALL_PROTEINS, PROTEINS } from "./utils/PROTEINS";

export function StartPage() {
  const set = useStore((s) => s.set);
  const r = useStore((s) => s.worldRadius);
  const scale = useStore((s) => s.scale);
  const worldRadius = useStore((s) => s.worldRadius);

  const [protein1, protein2, protein3] = ALL_PROTEINS.filter((p) =>
    getShouldRenderParticle(scale, p.radius, worldRadius)
  ).slice(0, 3);

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
            background: "hsl(0,0%,85%)",
          }}
          onClick={() => set({ started: true })}
          variant="outlined"
        >
          Start
        </Button>
      </div>
    </ErrorBoundary>
  );
}
