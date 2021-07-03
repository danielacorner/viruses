import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { MAX_SCALE } from "../utils/constants";
import { scaleAtom, useStore } from "../store";
const minScaleEverAtom = atomWithStorage("minScaleEver", MAX_SCALE);

/** David Attenborough style commentary */
const PopupToastsTour = () => {
  const [scale, setScale] = useAtom(scaleAtom);

  // when scale changes, remember the highest it's ever been
  const [minScaleEver, setMinScaleEver] = useAtom(minScaleEverAtom);
  useEffect(() => {
    setMinScaleEver(Math.min(scale, minScaleEver));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);

  // scale starts big (viruses) and gets smaller (proteins and antibodies)

  const TOUR_STEPS = [
    {
      triggered: minScaleEver < MAX_SCALE - 0.005,
    },
  ];

  return (
    <>
      {TOUR_STEPS.map(({ triggered }) =>
        triggered ? (
          <Alert variant="standard" severity="info">
            Hi
          </Alert>
        ) : null
      )}
    </>
  );
};

export default PopupToastsTour;
