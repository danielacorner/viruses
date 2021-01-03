import { useEffect } from "react";
import { useControl } from "react-three-gui";
import { useMount } from "../utils/utils";
import useSound from "use-sound";
import music from "../assets/music";

export function useAudioTrack() {
  const [play, { isPlaying, pause }] = useSound(music, { volume: 1 });
  const isAudioEnabled = useControl(`🎧 audio`, {
    // group: "Environment",
    type: "boolean",
    value: false,
  });

  useMount(() => {
    play();
  });
  useEffect(() => {
    if (isAudioEnabled && !isPlaying) {
      play();
    } else if (!isAudioEnabled && isPlaying) {
      pause();
    }
    return () => {
      pause();
    };
  }, [isAudioEnabled, isPlaying, play, pause]);
}
