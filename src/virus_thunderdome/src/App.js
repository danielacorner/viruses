import React, { Suspense, useEffect } from "react";
import Tooltip from "./components/SelectedParticle/SelectedParticleTooltip";
import { Button, Typography } from "@material-ui/core";
import WarningOutlined from "@material-ui/icons/WarningOutlined";
import { CanvasAndSceneEmpty } from "./CanvasAndSceneEmpty";
import { useStore } from "./store";
import { LoadingIndicator } from "./components/Scene/LoadingIndicator";
import { useMount } from "./utils/utils";
import { render } from "react-dom";
import MemoryStats from "react-memorystats";
import { BtnStartNextWave } from "./components/Scene/BtnStartNextWave";
import { CellAndAntibodyButtons } from "./components/CellAndAntibodyButtons/CellAndAntibodyButtons";
import { useLocalStorageState } from "./utils/useLocalStorageState";
import { AttributionLinks } from "./AttributionLinks";
import styled from "styled-components/macro";
function App() {
  useMount(() => {
    render(
      <MemoryStats corner="topLeft" />,
      document.getElementById("memoryStats")
    );
  });
  return (
    <div className="App">
      <LoadingIndicator />
      <LazyLoadedScene />
      <div id="memoryStats"></div>
      <Tooltip />
      <BtnStartNextWave />
      <CellAndAntibodyButtons />
      {/* <GuidedTour /> */}
      <AttributionLinks />
      <SaveControlsSettingsToLocalStorage />
    </div>
  );
}

export default App;

const CanvasAndSceneLazy = React.lazy(() => import("./CanvasAndScene"));

function LazyLoadedScene() {
  const set = useStore((s) => s.set);
  const started = useStore((s) => s.started);

  return started ? (
    <Suspense component={null}>
      <CanvasAndSceneLazy />
    </Suspense>
  ) : (
    <>
      <CanvasAndSceneEmpty />
      <StyledDiv
        css={`
          pointer-events: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: grid;
          place-items: center;
          align-content: center;
          grid-gap: 1em;
          min-height: 100vh;
          .title {
            pointer-events: auto;
            .logo {
              display: grid;
              align-content: center;
              font-size: 0.7em;
              position: relative;
              .l {
                opacity: 0.8;
              }
              .r {
                position: absolute;
                top: -8px;
                right: -7px;
                font-size: 0.8em;
                opacity: 0.7;
              }
            }
            h3 {
              display: grid;
              grid-auto-flow: column;
              font-size: 2.4em;
              .left {
                display: flex;
                margin-top: 0.6ch;
                margin-right: -1.4ch;
              }
              .right {
                margin-bottom: 0.5ch;
                font-size: 0.8em;
              }
            }
          }
          .requirements {
            display: grid;
            grid-auto-flow: column;
            place-items: center;
            grid-gap: 0.25em;
            height: fit-content;
            justify-items: center;
            svg {
              fill: #555555;
            }
          }
          button {
            padding: 0.5em 2em;
            pointer-events: auto;
          }
        `}
      >
        <div className="title">
          <Typography style={{ textAlign: "center" }} variant="h3">
            <div className="left">
              virus
              <div className="logo">
                <div className="l">🦠</div>
                <div className="r">⚡</div>
              </div>
            </div>
            <div className="right">Thunderdome</div>
          </Typography>
          <div className="requirements">
            <WarningOutlined />
            <Typography variant="body2">
              Requirements: 50MB download, 1GB memory
            </Typography>
          </div>
        </div>
        <Button onClick={() => set({ started: true })} variant="outlined">
          Start
        </Button>
      </StyledDiv>
    </>
  );
}

const StyledDiv = styled.div``;

function SaveControlsSettingsToLocalStorage() {
  const set = useStore((s) => s.set);
  const soundOn = useStore((s) => s.soundOn);

  const [settings, setSettings] = useLocalStorageState("settings", {
    soundOn,
  });

  // when app mounts, retrieve settings from local storage
  useMount(() => {
    if (!settings) {
      return;
    }
    if (settings.soundOn) {
      set({ soundOn: settings.soundOn });
    }
  });

  useEffect(() => {
    setSettings({ soundOn });
  }, [soundOn, setSettings]);

  return null;
}
