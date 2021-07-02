import { Button, Typography } from "@material-ui/core";
import { CanvasAndSceneEmpty } from "./CanvasAndSceneEmpty";
import { useStore } from "./store";
import ErrorBoundary from "./components/ErrorBoundary";
import { SingleParticle } from "./components/shapes/SingleParticle";
import { PROTEINS } from "./utils/PROTEINS";

export function StartPage() {
  const set = useStore((s) => s.set);
  const r = useStore((s) => s.worldRadius);
  const bacteriophage_phi29_prohead = PROTEINS.viruses.find(
    (p) => p.name === "Bacteriophage phi29 prohead"
  );
  const bacteriophage_p68 = PROTEINS.viruses.find(
    (p) => p.name === "Bacteriophage P68"
  );
  const virion_of_native_gene_transfer_agent_gta_particle =
    PROTEINS.viruses.find(
      (p) => p.name === "Virion of native gene transfer agent GTA particle"
    );
  return (
    <ErrorBoundary boundaryTitle={"Start Page"}>
      <CanvasAndSceneEmpty isStartPage={true}>
        <SingleParticle
          {...bacteriophage_phi29_prohead}
          position={[-r * 0.08, r * 0.15, r * 0.6]}
        />
        <SingleParticle
          {...bacteriophage_p68}
          position={[0, -r * 0.11, r * 0.5]}
        />
        <SingleParticle
          {...virion_of_native_gene_transfer_agent_gta_particle}
          position={[r * 0.11, r * 0.1, r * 0.7]}
        />
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
