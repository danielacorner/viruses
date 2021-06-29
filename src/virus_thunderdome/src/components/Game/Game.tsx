import React, { useRef, useState } from "react";
import { SingleParticleMounted } from "../particle/SingleParticleMounted";
import { useStore } from "../../store";
import { randBetween } from "../../utils/utils";
import { WAVES, Wave } from "./WAVES";
import { SHOT_TYPES } from "../CellAndAntibodyButtons/CellAndAntibodyButtons";
import { useFrame } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";

const VIRUS_SPAWN_START_DELAY = 1 * 1000;

/** Generates waves of viruses, and you click to create antibodies to defend against them */
export default function Game() {
  return (
    <>
      {/* <StorylineSequence {...{ setViruses }} /> */}
      <WavesOfVirusCreation />
      <CreateAntibodiesOnPointerDown />
      <Viruses />
      <Antibodies />
    </>
  );
}

function CreateAntibodiesOnPointerDown() {
  const pointerDownStartTime = useStore((s) => s.pointerDownStartTime);
  const set = useStore((s) => s.set);
  const absCreatedSincePointerDown = useStore(
    (s) => s.absCreatedSincePointerDown
  );
  const targetVirusIdx = useStore((s) => s.targetVirusIdx);
  const createAntibody = useStore((s) => s.createAntibody);
  const cellButtonIdx = useStore((s) => s.cellButtonIdx);
  const { absPerShot, speed } = SHOT_TYPES[cellButtonIdx];

  const antibody = WAVES[targetVirusIdx].antibody;
  useFrame(() => {
    if (!pointerDownStartTime) {
      return;
    }
    // create antibodies at a certain speed as long as the pointer is down
    const now = Date.now();
    const timeSincePointerDown = now - pointerDownStartTime;
    const numAbsNeededByNow = Math.max(
      0,
      1 + Math.floor(timeSincePointerDown * speed)
    );
    const shouldCreateAntibody = absCreatedSincePointerDown < numAbsNeededByNow;
    if (shouldCreateAntibody) {
      [...Array(absPerShot)].forEach(() => {
        createAntibody({
          abData: antibody,
          iconIdx: targetVirusIdx,
          id_str: `${Math.random()}`,
        });
      });
      set({ absCreatedSincePointerDown: absCreatedSincePointerDown + 1 });
    }
  });

  return null;
}

function Viruses() {
  const viruses = useStore((s) => s.viruses);
  const worldRadius = useStore((s) => s.worldRadius);

  return (
    <>
      {viruses.map(({ virusData, iconIdx, id_str }, idx) => {
        const jitter = 1 * worldRadius;
        const x = randBetween(-jitter, jitter);
        const y = worldRadius * 2 - randBetween(0, jitter);
        const z = randBetween(-jitter, jitter);
        return (
          <SingleParticleMounted
            {...{
              ...virusData,
              iconIdx,
              position: [x, y, z],
              key: id_str,
            }}
          />
        );
      })}
    </>
  );
}
function Antibodies() {
  const antibodies = useStore((s) => s.antibodies);
  const worldRadius = useStore((s) => s.worldRadius);
  const cellButtonIdx = useStore((s) => s.cellButtonIdx);
  const { getPosition } = SHOT_TYPES[cellButtonIdx];

  return (
    <>
      {antibodies.map(({ abData, iconIdx, id_str }, idx) => {
        const [x, y, z] = getPosition(worldRadius);
        return (
          <SingleParticleMounted
            {...{
              ...abData,
              iconIdx,
              position: [x, y, z],
              key: id_str,
              // each antibody decomposes after a set amount of time
              lifespan: 3.5 * 1000,
            }}
          />
        );
      })}
    </>
  );
}

function WavesOfVirusCreation() {
  const currentWaveIdx = useStore((s) => s.currentWaveIdx);
  console.log("🌟🚨 ~ WavesOfVirusCreation ~ currentWaveIdx", currentWaveIdx);
  const wavesSoFar = WAVES.slice(0, currentWaveIdx);

  return (
    <>
      {wavesSoFar.map((waveProps, idx) => (
        <SingleWave key={idx} {...{ ...waveProps }} />
      ))}
    </>
  );
}

const APPEAR_INTERVAL = 1000;

/** perform all actions necessary for the wave e.g. spawn viruses, move camera */
function SingleWave({ viruses, moveCameraTo = null }: Wave) {
  const createVirus = useStore((s) => s.createVirus);
  const started = useStore((s) => s.started);
  const scale = useStore((s) => s.scale);
  const { active: loading } = useProgress();
  const currentWaveIdx = useStore((s) => s.currentWaveIdx);
  const scaleTarget = WAVES[Math.max(0, currentWaveIdx - 1)].scaleTarget;
  const isScaleTarget = scale - scaleTarget <= 0.000000000000000002; // seems to be the final value for scale

  const isPropertyAnimating = useStore((s) => s.isPropertyAnimating);

  const readyToCreateViruses =
    started && !isPropertyAnimating && isScaleTarget && !loading;

  const waveStartTime = useStore((s) => s.waveStartTime);
  const numVirusesCreatedPerType = useRef(viruses.map((_) => 0));
  // const totalVirusesSoFar = useTotalVirusesSoFar();

  useFrame(() => {
    if (!readyToCreateViruses) {
      return;
    }

    const timeInWave = waveStartTime ? Date.now() - waveStartTime : 0;

    viruses.forEach(
      ({ virus: { virusData, iconIdx }, numViruses }, virusIdx) => {
        const totalVirusesNeededByNow = Math.min(
          numViruses,
          Math.floor(
            (timeInWave - virusIdx * 500 - VIRUS_SPAWN_START_DELAY) /
              APPEAR_INTERVAL
          )
        );
        const shouldCreateVirus =
          totalVirusesNeededByNow > numVirusesCreatedPerType.current[virusIdx];

        if (shouldCreateVirus) {
          numVirusesCreatedPerType.current[virusIdx] =
            numVirusesCreatedPerType.current[virusIdx] + 1;
          createVirus({ virusData, iconIdx, id_str: `${Math.random()}` });
        }
      }
    );
  });

  const [dollyFinished, setDollyFinished] = useState(false);

  return moveCameraTo && !dollyFinished ? (
    <DollyMoveCamera {...{ moveCameraTo, setDollyFinished }} />
  ) : null;
}

const ANIMATION_DURATION = 10 * 1000;
function DollyMoveCamera({ moveCameraTo, setDollyFinished }) {
  const [, , z2] = moveCameraTo;
  const now = useRef(Date.now());

  useFrame(({ clock, camera }) => {
    // const secondsElapsed = clock.getElapsedTime();
    const timeSinceMounted = Date.now() - now.current;
    const pctDone = timeSinceMounted / ANIMATION_DURATION;

    if (pctDone >= 1) {
      setDollyFinished(true);
      return;
    }

    const { z } = camera.position;
    const dz = z2 - z;

    camera.position.z = z + dz * pctDone;
  });

  return null;
}

/**
 * 1. the game starts at the antibody scale (0.03)
 * we practice making antibodies, and playing with the temperature
 * (they could come out of membrane transport proteins?)
 * we notice the antibodies each disappear after a certain time (with error bars)
 *
 * 2. the game scale out a bit (0.01), tiny viruses start appearing,
 * the antibodies attach to them (hp bars decrease)
 * when a virus is fully coated, becomes semi-transparent,
 * eventually it's cleaned up by a white blood cell
 *
 * 3. whenever a virus touches the cell membrane below, hp bar decreases? hardcore: 1-hit ko?
 *
 * 4. scale out more and repeat
 *
 */
export function StorylineSequence() {
  // 1. first, animate the scale to 0.01
  // useSpringStoreAfterTimeout({
  //   startTime: WAVES[0].startTime,
  //   // startTime: 60 * 1000,
  //   property: "scale",
  //   target: 0.01,
  //   springConfig: { mass: 1, tension: 170, friction: 50, precision: 0.0001 },
  // });

  // 2.1. animate the scale to 0.01
  // useSpringStoreAfterTimeout({
  //   startTime: WAVES[1].startTime,
  //   // startTime: 60 * 1000,
  //   property: "scale",
  //   target: 0.006,
  //   springConfig: { mass: 1, tension: 170, friction: 50, precision: 0.0001 },
  // });

  // animate something once after a timeout
  // useAnimateAfterTimeout({
  //   startTime: 5000,
  //   endTime: 12000,
  //   target: 0.01,
  //   property: "scale"
  // });
  // set something once after a timeout
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     set({ scale: 0.01 });
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [set]);

  return <></>;
}
