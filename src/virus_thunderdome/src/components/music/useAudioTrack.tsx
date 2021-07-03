import { useEffect, useState } from "react";
// import useSound from "use-sound";
// import music from "./music";
import { useStore } from "../../store";
import { useAtom } from "jotai";
import { isAudioPlayingAtom } from "../../../../store";

export function usePlayAudioTrackOnStart() {
  const started = useStore((s) => s.started);
  const isWaveComplete = useStore((s) => s.isWaveComplete);
  const currentWaveIdx = useStore((s) => s.currentWaveIdx);
  // const soundOn = useStore((s) => s.soundOn);
  // const [play, { isPlaying, pause }] = useSound(music, {
  //   volume: isWaveComplete ? 0.4 : 1,
  // });
  const [isAudioEnabled, setIsAudioEnabled] = useAtom(isAudioPlayingAtom);

  // start the music when we click "ready" for the first time
  useEffect(() => {
    if (started && !isWaveComplete && currentWaveIdx >= 1 && !isAudioEnabled) {
      setIsAudioEnabled(true);
    }
  }, [
    started,
    isWaveComplete,
    isAudioEnabled,
    currentWaveIdx,
    setIsAudioEnabled,
  ]);

  // useEffect(() => {
  //   if (soundOn && isAudioEnabled && !isPlaying) {
  //     play();
  //   } else if (!isAudioEnabled && isPlaying) {
  //     pause();
  //   }
  //   return () => {
  //     pause();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isAudioEnabled, soundOn]);
}
