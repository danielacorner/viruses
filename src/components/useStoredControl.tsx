import { useEffect } from "react";
import { ControlOptions, useControl } from "react-three-gui";
import { useStore } from "../store";

/** name must be identical to stored value */
export function useStoredControl(name: string, controlProps: ControlOptions) {
  // const storedValue = useStore((state) => state[name]);
  const controlledValue: number = useControl(name, controlProps);
  // sync temperature to store
  const set = useStore((state) => state.set);
  useEffect(() => {
    set({ [name]: controlledValue });
  }, [set, name, controlledValue]);

  return controlledValue;
}
