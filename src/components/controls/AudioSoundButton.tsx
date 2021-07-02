import { VolumeUp, VolumeMute } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import ReactPlayer from "react-player";
import styled from "styled-components/macro";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { BREAKPOINT_MOBILE } from "../../utils/constants";
const isAudioPlayingAtom = atomWithStorage("isAudioPlaying", false); // As of Chrome 66, videos must be muted in order to play automatically https://www.npmjs.com/package/react-player

/** show or hide the info overlay */
export default function AudioSoundButton() {
  const [isAudioPlaying, setIsAudioPlaying] = useAtom(isAudioPlayingAtom);

  const music = {
    title: "Inner Life of the Cell - Protein Packing",
    href: "https://www.youtube.com/watch?v=uHeTQLNFTgU",
  };
  return (
    <>
      <SoundButtonStyles>
        <Tooltip title={isAudioPlaying ? "mute 🔈" : "unmute 🔊"}>
          <IconButton onClick={() => setIsAudioPlaying(!isAudioPlaying)}>
            {isAudioPlaying ? <VolumeUp /> : <VolumeMute />}
            <div className="soundInfo">
              <a href={music.href} target="_blank" rel="noopener noreferrer">
                {music.title}
              </a>
            </div>
          </IconButton>
        </Tooltip>
      </SoundButtonStyles>
      <ReactPlayer
        style={{ visibility: "hidden", position: "fixed" }}
        playing={isAudioPlaying}
        url={music.href}
      />
    </>
  );
}
const SoundButtonStyles = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  height: 48px;
  width: 48px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  .MuiButtonBase-root {
    color: hsla(0, 100%, 0%, 0.5);
    position: relative;
  }
  .soundInfo {
    font-size: 16px;
    @media (min-width: ${BREAKPOINT_MOBILE}px) {
      font-size: 18px;
    }
    position: absolute;
    right: 48px;
    a {
      color: hsla(0, 100%, 0%, 0.5);
    }
    opacity: 0;
  }
  &:hover {
    .soundInfo {
      opacity: 0.5;
    }
  }
`;
