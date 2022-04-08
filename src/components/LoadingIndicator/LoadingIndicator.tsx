import { useEffect } from "react";
import { Button, LinearProgress, Typography } from "@material-ui/core";
import { useProgress } from "@react-three/drei";
import styled from "styled-components/macro";
import { CanvasAndSceneEmpty } from "../../CanvasAndSceneEmpty";
import * as Sentry from "@sentry/react";
import { isDarkModeAtom, useStore } from "../../store";
import { useAtom } from "jotai";
import { SpinningParticle } from "./SpinningParticle";

const TIME_BEFORE_SHOW_REFRESH_BTN = 20 * 1000;
export const SPEED_Y = 0.5;
export const SPEED_X = 0.2;
export const AMPLITUDE_Y = 1;
export const AMPLITUDE_X_INV = 0.01;

function useDetectStuckOnLoading() {
  const { active, progress } = useProgress();
  const set = useStore((s) => s.set);
  // if it's been loading with the same progress for 30s, we'll show a refresh button
  useEffect(() => {
    let timer;
    if (active) {
      timer = setTimeout(() => {
        set({ hasRunOutOfMemory: true });
      }, TIME_BEFORE_SHOW_REFRESH_BTN);
    }

    return () => {
      clearTimeout(timer);
      set({ hasRunOutOfMemory: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, active]);
}

export function LoadingIndicator() {
  const [isDarkMode] = useAtom(isDarkModeAtom);
  useDetectStuckOnLoading();
  const { active, progress, errors, item, loaded, total } = useProgress();
  return errors.length > 0 ? (
    <div
      style={{ maxWidth: "100vw", wordBreak: "break-all", padding: "0 6em" }}
    >
      {JSON.stringify(errors)}
    </div>
  ) : active ? (
    <Sentry.ErrorBoundary
      fallback={() => {
        return null;
      }}
    >
      <LoadingIndicatorStyles {...{ isDarkMode }}>
        <div>
          {loaded}/{total} models loaded
        </div>{" "}
        <div>loading asset: {item}</div>
      </LoadingIndicatorStyles>
      <LinearProgress
        {...(loaded === 0
          ? { variant: "indeterminate" }
          : { variant: "determinate", value: progress })}
      />
      <CanvasAndSceneEmpty isLoadingIndicator={true}>
        <SpinningParticle />
      </CanvasAndSceneEmpty>
    </Sentry.ErrorBoundary>
  ) : null;
}

const LoadingIndicatorStyles = styled.div`
  position: fixed;
  max-width: 100vw;
  top: 4px;
  font-size: 0.8em;
  display: grid;
  place-content: center;
  justify-items: start;
  align-items: start;
  z-index: 10;
  right: 1em;
  left: 4em;
  width: calc(100vw - 5em);
  grid-template-columns: 16vw 1fr;
  grid-gap: 1em;
  word-break: break-all;
  color: ${(p) => (p.isDarkMode ? "white" : "black")};
`;

const SDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  color: ${(p) => (p.isDarkMode ? "white" : "black")};
`;
export function HasRunOutOfMemory() {
  const hasRunOutOfMemory = useStore((s) => s.hasRunOutOfMemory);
  const [isDarkMode] = useAtom(isDarkModeAtom);
  return (
    hasRunOutOfMemory && (
      <SDiv {...{ isDarkMode }}>
        <Typography variant="h6" className="oops">
          Oops, looks like it{"'"}s not loading... try again?
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </SDiv>
    )
  );
}
