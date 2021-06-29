import React, { useEffect } from "react";
import { useStore } from "../../store";
import { Slider } from "@material-ui/core";
import styled from "styled-components/macro";
import { AcUnit, Whatshot } from "@material-ui/icons";

export function TemperatureControls() {
  const temperature = useStore((s) => s.temperature);
  const setTemperature = useStore((s) => s.setTemperature);
  const scale = useStore((s) => s.scale);
  const set = useStore((s) => s.set);
  const paused = useStore((s) => s.paused);

  // set temperature low initially

  useEffect(() => {
    const timer = setTimeout(() => {
      // const scaleStored = window.localStorage.getItem("settings")
      //   ? JSON.parse(window.localStorage.getItem("settings")).scale
      //   : scale;
      // set temperature to something reasonable, based on the scale
      // set({ temperature: 0.0000001 / scaleStored });
      // set({ temperature: 0.01 });
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [set]);

  const max = getMaxTemp(scale);

  return (
    <TemperatureControlsStyles>
      <div className="grid">
        <div className="grid-item">
          <Whatshot style={{ fill: "#555555" }} />
        </div>
        <div className="grid-item slider">
          <Slider
            orientation="vertical"
            aria-labelledby="volume-slider"
            onChange={(event, newValue) => {
              // pause when temperature is moved to 0
              // unpause when temperature is moved away from 0
              if (newValue === 0 && !paused) {
                set({ paused: true });
              } else if (newValue !== 0 && paused) {
                set({ paused: false });
              }

              setTemperature(newValue);
            }}
            min={0}
            max={max}
            step={0.0000001}
            value={temperature}
          />
        </div>
        <div className="grid-item">
          <AcUnit style={{ fill: "#555555" }} />
        </div>
      </div>
    </TemperatureControlsStyles>
  );
}
const TemperatureControlsStyles = styled.div`
  height: 100%;
  width: 100%;
  .grid {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    align-items: center;
    grid-gap: 1em;
    .grid-item {
      width: fit-content;
      margin: auto;
    }
    .slider {
      height: 100%;
    }
  }
`;

export function getMaxTemp(scale) {
  return 0.005 / scale ** 2;
}
