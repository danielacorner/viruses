import React from "react";
import { useEffect } from "react";
import { useMount } from "../utils/utils";
import useSound from "use-sound";
import music from "../assets/music";
import { IconButton } from "@material-ui/core";
import { VolumeOff, VolumeUp } from "@material-ui/icons";
import { useLocalStorageState } from "../utils/useLocalStorageState";
import styled from "styled-components/macro";
import { useStore } from "../store";

const AudioTrack = () => {
  const [isSoundOnLS, setIsSoundOnLS] = useLocalStorageState("isSoundOn", true);
  const started = useStore((s) => s.started);

  useAudioTrack(started && isSoundOnLS);

  return (
    <MuteButtonStyles>
      <IconButton onClick={() => setIsSoundOnLS(!isSoundOnLS)}>
        {isSoundOnLS ? <VolumeUp /> : <VolumeOff />}
      </IconButton>
    </MuteButtonStyles>
  );
};

const MuteButtonStyles = styled.div`
  position: fixed;
  top: 0em;
  right: 0em;
`;

export default AudioTrack;

function useAudioTrack(isSoundOn) {
  const [play, { isPlaying, pause }] = useSound(music, { volume: 1 });
  useMount(() => {
    if (isSoundOn) {
      play();
    }
    return () => {
      pause();
    };
  });
  useEffect(() => {
    if (isSoundOn && !isPlaying) {
      play();
    } else if (!isSoundOn && isPlaying) {
      pause();
    }
  }, [isSoundOn, isPlaying, play, pause]);
}
