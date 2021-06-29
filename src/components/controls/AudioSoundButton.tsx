import { VolumeUp, VolumeMute } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import ReactPlayer from "react-player";
import styled from "styled-components/macro";
import { useLocalStorageState } from "../../utils/useLocalStorageState";

/** show or hide the info overlay */
export default function AudioSoundButton() {
  const [isAudioPlaying, setIsAudioPlaying] = useLocalStorageState(
    // const [isAudioPlaying, setIsAudioPlaying] = useState(
    "isAudioPlaying",
    false // As of Chrome 66, videos must be muted in order to play automatically https://www.npmjs.com/package/react-player
  );

  const music = {
    title: "The Inner Life of the Cell - Protein Packing [Narrated]",
    href: "https://www.youtube.com/watch?v=VdmbpAo9JR4",
  };
  return (
    <>
      <SoundButtonStyles>
        <Tooltip title={isAudioPlaying ? "mute 🔈" : "unmute 🔊"}>
          <IconButton onClick={() => setIsAudioPlaying(!isAudioPlaying)}>
            {isAudioPlaying ? <VolumeUp /> : <VolumeMute />}
          </IconButton>
        </Tooltip>
        <div className="soundInfo">
          <a href={music.href} target="_blank" rel="noopener noreferrer">
            {music.title}
          </a>
        </div>
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
  height: 48px;
  width: 48px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  .MuiButtonBase-root {
    color: hsla(0, 100%, 100%, 0.5);
  }
  .soundInfo {
    a {
      color: white;
    }
    opacity: 0;
  }
  &:hover {
    .soundInfo {
      opacity: 0.5;
    }
  }
`;
