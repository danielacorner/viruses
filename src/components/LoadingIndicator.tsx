import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import { LinearProgress } from "@material-ui/core";
import { useMount } from "../utils/utils";
import { useLocalStorageState } from "../utils/useLocalStorageState";

// TECHDEBT: could estimate load time by testing user's connection speed https://www.geeksforgeeks.org/how-to-detect-network-speed-using-javascript/
const ESTIMATED_LOAD_TIME = 5 * 60 * 1000;

export function LoadingIndicator() {
  const set = useStore((s) => s.set);
  const loading = useStore((s) => s.loading);
  const started = useStore((s) => s.started);

  // keep loaded percent in local storage so we don't load again on same device
  const [percentLoaded, setPercentLoaded] = useLocalStorageState(
    "percentLoaded",
    "0"
  );

  // start loading
  // * can use performance.timing.transferSize in firefox here to estimate timing
  useMount(() => set({ loading: true }));

  // stop loading after ~2min
  useEffect(() => {
    if (started) {
      window.setTimeout(() => {
        set({ loading: false });
      }, ESTIMATED_LOAD_TIME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  // increment every second
  const interval = ESTIMATED_LOAD_TIME / 100;
  useInterval({
    cb: () => {
      setPercentLoaded((prev) => `${Number(prev) + 1}`);
    },
    interval,
  });

  return started && loading ? (
    <LinearProgress variant="determinate" value={Number(percentLoaded)} />
  ) : null;
}

function StartTheClock() {}

function useInterval({ cb, interval }) {
  useMount(() => {
    const timer = window.setInterval(cb, interval);
    return () => window.clearInterval(timer);
  });
}
