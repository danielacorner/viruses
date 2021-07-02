import React from "react";
import { useStore } from "./store";
import { Slider, Typography } from "@material-ui/core";
import styled from "styled-components/macro";
import { AcUnit, Whatshot } from "@material-ui/icons";

export function TemperatureControls() {
  const temperature = useStore((s) => s.temperature);
  const scale = useStore((s) => s.scale);
  const set = useStore((s) => s.set);
  const setTemperature = useStore((s) => s.setTemperature);
  const paused = useStore((s) => s.paused);

  // set temperature low initially

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // const scaleStored = window.localStorage.getItem("settings")
  //     //   ? JSON.parse(window.localStorage.getItem("settings")).scale
  //     //   : scale;
  //     // set temperature to something reasonable, based on the scale
  //     // set({ temperature: 0.0000001 / scaleStored });
  //     // set({ temperature: 0.01 });
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [set]);

  const max = 0.003 / scale ** 2;

  return (
    <TemperatureControlsStyles>
      <Typography align="center" id="volume-slider" gutterBottom>
        Temperature
      </Typography>
      <div className="grid">
        <div className="grid-item">
          <AcUnit />
        </div>
        <div className="grid-item">
          <Slider
            valueLabelDisplay="auto"
            aria-labelledby="volume-slider"
            onChange={(event, newValue) => {
              // pause when temperature is moved to 0
              // unpause when temperature is moved away from 0
              if (newValue === 0 && !paused) {
                set({ paused: true });
              } else if (newValue !== 0 && paused) {
                set({ paused: false });
              }

              const newT = Number(newValue) ** POW;
              setTemperature(newT);
              // set({ temperature: newValue });
            }}
            value={temperature ** (1 / POW)}
            min={0}
            max={max}
            step={0.0000001}
          />
        </div>
        <div className="grid-item">
          <Whatshot />
        </div>
      </div>
    </TemperatureControlsStyles>
  );
}

const POW = 0.5;

const TemperatureControlsStyles = styled.div`
  .grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    grid-gap: 1em;
  }
`;
