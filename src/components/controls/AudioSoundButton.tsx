import { VolumeUp, VolumeMute } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import styled from "styled-components/macro";
import { useAtom } from "jotai";
import { BREAKPOINT_MOBILE } from "../../utils/constants";
import { isAudioPlayingAtom, isDarkModeAtom } from "../../store";
import { getIsTouchDevice } from "../../getIsTouchDevice";
import { useEffect } from "react";
import useSound from "use-sound";
import { useMount } from "../../utils/utils";

/** show or hide the info overlay */
export default function AudioSoundButton({ title, href, audioFile }) {
  const [isAudioPlaying, setIsAudioPlaying] = useAtom(isAudioPlayingAtom);

  useAudioTrack(isAudioPlaying, audioFile);

  const [isDarkMode] = useAtom(isDarkModeAtom);
  return (
    <>
      <SoundButtonStyles {...{ isDarkMode, isAudioPlaying }}>
        <Tooltip title={isAudioPlaying ? "mute 🔈" : "unmute 🔊"}>
          <IconButton onClick={() => setIsAudioPlaying(!isAudioPlaying)}>
            {isAudioPlaying ? <VolumeUp /> : <VolumeMute />}
            <div className="soundInfo">
              <a href={href} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
            </div>
          </IconButton>
        </Tooltip>
      </SoundButtonStyles>
    </>
  );
}

function useAudioTrack(isSoundOn, music) {
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

const SoundButtonStyles = styled.div`
  position: fixed;
  z-index: 20;
  top: 0px;
  right: 0px;
  height: 48px;
  width: 48px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  .MuiButtonBase-root {
    color: hsla(0, 0%, ${(p) => (p.isDarkMode ? 100 : 0)}%, 0.5);
    position: relative;
  }
  .soundInfo {
    padding: 20px 0;
    font-size: 16px;
    @media (min-width: ${BREAKPOINT_MOBILE}px) {
      font-size: 18px;
    }
    position: absolute;
    right: 48px;
    a {
      color: hsla(0, 100%, 0%, 0.5);
    }
    opacity: ${(p) => (p.isAudioPlaying && getIsTouchDevice() ? 0.5 : 0)};
    max-width: calc(100vw - ${3 * 32}px);
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    .soundInfo {
      opacity: ${() => (getIsTouchDevice() ? `$$$` : 0.5)};
    }
  }
`;
