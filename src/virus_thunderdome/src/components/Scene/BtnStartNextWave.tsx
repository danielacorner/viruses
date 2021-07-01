import { useEffect, useState } from "react";
import { INITIAL_PLAYER_HP, useStore } from "../../store";
import styled from "styled-components/macro";
import { Typography, Button } from "@material-ui/core";
import {
  SpringScaleToTarget,
  SpringTemperatureToTarget,
  WAVES,
} from "../Game/WAVES";
import { useGLTF, useProgress } from "@react-three/drei";

const WAVE_START_DELAY = 1 * 1000;

export function BtnStartNextWave() {
  const set = useStore((s) => s.set);
  const started = useStore((s) => s.started);
  const numDefeatedViruses = useStore((s) => s.numDefeatedViruses);
  const { active: loading } = useProgress();
  const currentWaveIdx = useStore((s) => s.currentWaveIdx);

  // when the wave ends, show the "next wave" button,
  const totalVirusesSoFar = useTotalVirusesSoFar();

  const isWaveComplete = useStore((s) => s.isWaveComplete);
  useEffect(() => {
    if (numDefeatedViruses === totalVirusesSoFar && !isWaveComplete) {
      console.log("🌟🚨 ~ useEffect ~ totalVirusesSoFar", totalVirusesSoFar);
      console.log("🌟🚨 ~ useEffect ~ numDefeatedViruses", numDefeatedViruses);
      setTimeout(() => {
        set({ isWaveComplete: true });
        // restore full HP
        set({ playerHp: INITIAL_PLAYER_HP });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numDefeatedViruses, totalVirusesSoFar, set]);

  // stop showing "incoming!!" after a bit
  const [isWaveIncoming, setIsWaveIncoming] = useState(false);
  useEffect(() => {
    if (isWaveIncoming) {
      setTimeout(() => {
        setIsWaveIncoming(false);
      }, 3 * 1000);
    }
  }, [isWaveIncoming]);

  return !started || loading ? null : (
    <NextWaveStyles>
      {isWaveComplete ? (
        <>
          <NextWaveAssets />
          {currentWaveIdx === 0 ? <WelcomeText /> : null}
          <Button
            style={{
              padding: "0.5em 2em",
              pointerEvents: "auto",
              background: "#88fff914",
            }}
            onClick={() => {
              set({ currentWaveIdx: currentWaveIdx + 1 });
              set({ isWaveComplete: false });
              set({ waveStartTime: Date.now() });
              setIsWaveIncoming(true);
            }}
            variant="outlined"
          >
            {currentWaveIdx === 0 ? "Ready" : "Next Wave"}
          </Button>
        </>
      ) : isWaveIncoming ? (
        <>
          <div className="incomingText">Wave {currentWaveIdx} Incoming!!</div>
          <NextWaveSprings />
        </>
      ) : null}
    </NextWaveStyles>
  );
}

function WelcomeText() {
  return (
    <WelcomeTextStyles>
      <Typography style={{ textAlign: "center" }} variant="h3">
        virus
        <div className="logo">
          <div className="l">🦠</div>
          <div className="r">⚡</div>
        </div>
        thunderdome
      </Typography>
    </WelcomeTextStyles>
  );
}

const WelcomeTextStyles = styled.div`
  pointer-events: auto;
  color: black;
  font-size: 1.4em;
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
`;

const NextWaveStyles = styled.div`
  font-size: 2em;
  color: #f0461b;
  .incomingText {
    white-space: nowrap;
    animation-name: appearDisappear;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  }
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  pointer-events: none;
  display: grid;
  place-items: center;

  @keyframes appearDisappear {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export function useTotalVirusesSoFar() {
  const currentWaveIdx = useStore((s) => s.currentWaveIdx);

  // complete the wave when we've defeated all viruses so far
  const wavesSoFar = WAVES.slice(0, currentWaveIdx);
  const totalVirusesSoFar = wavesSoFar.reduce(
    (acc, cur) => acc + cur.viruses.reduce((a, c) => c.numViruses + a, 0),
    0
  );
  return totalVirusesSoFar;
}

function NextWaveAssets() {
  const currentWaveIdx = useStore((s) => s.currentWaveIdx);
  const nextWave = WAVES[currentWaveIdx];

  if (!nextWave) {
    return;
  }

  const { assets } = nextWave;
  if (assets.length > 0) {
    nextWave.assets.forEach((assetPath) => {
      useGLTF.preload(assetPath);
    });
  }

  return null;
}

function NextWaveSprings() {
  const currentWaveIdx = useStore((s) => s.currentWaveIdx);
  const nextWave = WAVES[currentWaveIdx - 1];
  const { active: loading } = useProgress();

  // when assets are done loading, launch the spring after a short timeout (otherwise it gets blocked in production?)
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ready && !loading) {
      setTimeout(() => {
        setReady(true);
      }, WAVE_START_DELAY);
    }
  }, [ready, loading]);

  if (!nextWave) {
    return null;
  }

  const { Spring, scaleTarget, temperatureTarget } = nextWave;

  // some waves animate properties in the store
  // like scale, wallHeight
  return (
    <>
      {ready && Spring ? <Spring /> : null}
      {ready && scaleTarget ? (
        <SpringScaleToTarget target={scaleTarget} />
      ) : null}
      {ready && temperatureTarget ? (
        <SpringTemperatureToTarget target={temperatureTarget} />
      ) : null}
    </>
  );
}
