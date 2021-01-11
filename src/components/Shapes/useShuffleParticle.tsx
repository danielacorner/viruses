import { useEffect } from "react";
import { useStore } from "../../store";

export function useShuffleParticle({ ref, api }) {
  const shuffled = useStore((s) => s.shuffled);
  const worldRadius = useStore((s) => s.worldRadius);
  useEffect(() => {
    // api.
    if (shuffled !== 0) {
      console.log("🌟🚨 ~ useEffect ~ api", api);
      // api.position.set([0, 0, 0]);
      // api.position.set(getRandStartPosition(worldRadius));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffled]);
}
