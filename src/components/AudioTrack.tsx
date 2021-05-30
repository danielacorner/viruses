import React, { useState } from "react";
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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <MuteButtonAndSourceStyles
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...{ isHovered }}
    >
      <div className="btnMute">
        <IconButton onClick={() => setIsSoundOnLS(!isSoundOnLS)}>
          {isSoundOnLS ? <VolumeUp /> : <VolumeOff />}
        </IconButton>
      </div>

      <a
        className="btnSource"
        href="https://www.youtube.com/watch?v=VdmbpAo9JR4"
        target="_blank"
        rel="noopener noreferrer"
      >
        The Inner Life of the Cell - Protein Packing {"["}Narrated{"]"}
      </a>
    </MuteButtonAndSourceStyles>
  );
};
const MuteButtonAndSourceStyles = styled.div`
  .btnMute {
    position: fixed;
    top: 0em;
    right: 0em;
    padding-left: 48px;
  }
  .btnSource {
    padding: 0 0 2em;
    text-shadow: 0px 1px 4px white, 0px 1px 4px white, 0px 1px 4px white,
      0px 1px 4px white;
    position: fixed;
    top: 3em;
    right: 0em;
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    opacity: ${(p) => (p.isHovered ? 1 : 0)};
    transform: translateX(${(p) => (p.isHovered ? -16 : 0)}px);
  }
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
