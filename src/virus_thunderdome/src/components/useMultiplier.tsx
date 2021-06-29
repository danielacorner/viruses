import { useControl } from "react-three-gui";

export function useMultiplier() {
  return useControl("mult", {
    type: "number",
    min: 0,
    max: 10,
    value: 3,
  });
}
