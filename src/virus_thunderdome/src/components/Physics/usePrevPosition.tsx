import { useRef } from "react";
import { useMount } from "../../utils/utils";

function usePrevPosition(api) {
  const prevPosition = useRef([0, 0, 0]);
  useMount(() => api.position.subscribe((p) => (prevPosition.current = p)));
}
