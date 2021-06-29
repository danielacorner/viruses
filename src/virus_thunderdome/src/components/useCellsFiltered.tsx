import { useStore } from "../store";
import { CELLS } from "./CellAndAntibodyButtons/CellsModels";

export function useCellsFiltered() {
  const currentWaveIdx = useStore((s) => s.currentWaveIdx);
  const isWaveComplete = useStore((s) => s.isWaveComplete);
  const cellsFiltered = CELLS.slice(
    0,
    Math.max(1, currentWaveIdx + (isWaveComplete ? 1 : 0))
  );
  return /* process.env.NODE_ENV === "development" ? CELLS.slice(0, 2) : */ cellsFiltered;
}
