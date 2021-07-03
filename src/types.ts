import * as THREE from "three";
export type Vector = [number, number, number];
export type Quaternion = [number, number, number, number];

// api
export type WorkerVec = {
  set: (x: number, y: number, z: number) => void;
  copy: ({ x, y, z }: THREE.Vector3 | THREE.Euler) => void;
  subscribe: (callback: (value: number[]) => void) => void;
};
