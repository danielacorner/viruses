import { useStore } from "../../store";
import { Protein, PROTEINS } from "../../utils/PROTEINS";
import { getMaxTemp } from "../Controls/TemperatureControls";
import { useSpringStoreImmediately } from "../useSpringAfterTimeout";
import { ReactComponent as Icon1 } from "./icons/virus_1.svg";
import { ReactComponent as Icon2 } from "./icons/virus_2.svg";
import { ReactComponent as Icon3 } from "./icons/virus_3.svg";
import { ReactComponent as Icon4 } from "./icons/virus_4.svg";
import { ReactComponent as Icon5 } from "./icons/virus_5.svg";

export const ICONS = [Icon1, Icon2, Icon3, Icon4, Icon5];

// const antibody_hiv = PROTEINS.antibodies.find(
//   (ab) => ab.name === "anti-HIV Antibody"
// );
const antibody_virion = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-GTA-Virion Antibody"
);
const antibody_bacteriophage_phi29_prohead = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-Bacteriophage Antibody"
);
const antibody_hpv = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-HPV Antibody"
);
// const antibody_herpes = PROTEINS.antibodies.find(
//   (ab) => ab.name === "anti-Herpes Antibody"
// );
const antibody_poliovirus = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-Poliovirus Antibody"
);
const antibody_faustovirus = PROTEINS.antibodies.find(
  (ab) => ab.name === "anti-Faustovirus Antibody"
);
const Polio = {
  iconIdx: 0,
  virusData: PROTEINS.viruses.find((v) => v.name === "Poliovirus"),
};
const HPV = {
  iconIdx: 1,
  virusData: PROTEINS.viruses.find(
    (v) => v.name === "Human Papillomavirus (HPV)"
  ),
};
// const Herpes = {
//   iconIdx: 2,
//   virusData: PROTEINS.viruses.find((v) => v.name === "Herpes"),
// };
// const HIV = {
//   iconIdx: 3,
//   virusData: PROTEINS.viruses.find((v) => v.name === "HIV"),
// };
const GTA_virion = {
  iconIdx: 2,
  virusData: PROTEINS.viruses.find(
    (v) => v.name === "Virion of native gene transfer agent GTA particle"
  ),
};
const Bacteriophage_phi29_prohead_80 = {
  iconIdx: 3,
  virusData: PROTEINS.viruses.find(
    (v) => v.name === "Bacteriophage phi29 prohead"
  ),
};
const Faustovirus = {
  iconIdx: 4,
  virusData: PROTEINS.viruses.find((v) => v.name === "Faustovirus"),
};

export type Wave = {
  viruses: {
    virus: { virusData: Protein; iconIdx: number };
    numViruses: number;
  }[];
  antibody: Protein;
  moveCameraTo?: [number, number, number];
  scaleTarget?: number;
  temperatureTarget?: number;
  ceilingHeightTarget?: number;
  Spring?: Function;
  assets: string[];
};

export const WAVES: Wave[] = [
  {
    viruses: [{ numViruses: 8, virus: Polio }],
    antibody: antibody_poliovirus,
    scaleTarget: 0.01,
    temperatureTarget: getMaxTemp(0.01) * 0.1,
    assets: [
      "/models/cells/lymphocyte.glb",
      "/models/viruses/poliovirus_50.glb",
      "/models/antibodies/antibody_poliovirus_10.glb",
    ],
    moveCameraTo: [0, 5, 18],
    Spring: () => {
      useSpringStoreImmediately({
        property: "ceilingHeight",
        target: 16,
        springConfig: {
          mass: 1,
          tension: 170,
          friction: 10,
          precision: 0.0001,
        },
      });
      return null;
    },
  },
  {
    viruses: [
      { numViruses: 4, virus: Polio },
      { numViruses: 8, virus: HPV },
    ],
    antibody: antibody_hpv,
    assets: [
      "/models/cells/monocyte.glb",
      "/models/viruses/hpv_100.glb",
      "/models/antibodies/antibody_hpv_10.glb",
    ],
    scaleTarget: 0.006,
    temperatureTarget: getMaxTemp(0.006) * 0.2,
    Spring: () => {
      useSpringStoreImmediately({
        property: "ceilingHeight",
        target: 18,
        springConfig: {
          mass: 1,
          tension: 170,
          friction: 10,
          precision: 0.0001,
        },
      });
      return null;
    },
  },
  {
    viruses: [
      { numViruses: 4, virus: Polio },
      { numViruses: 4, virus: HPV },
      { numViruses: 8, virus: GTA_virion },
    ],
    antibody: antibody_virion,
    assets: [
      "/models/cells/eosinophil.glb",
      "/models/viruses/virion_of_native_gene_transfer_agent_gta_particle_120.glb",
      "/models/antibodies/antibody_herpes.glb",
    ],
    moveCameraTo: [0, 16, 19],
    scaleTarget: 0.003,
    temperatureTarget: getMaxTemp(0.003) * 0.4,
    Spring: () => {
      useSpringStoreImmediately({
        property: "ceilingHeight",
        target: 24,
        springConfig: {
          mass: 1,
          tension: 170,
          friction: 10,
          precision: 0.0001,
        },
      });
      return null;
    },
  },
  {
    viruses: [
      { numViruses: 2, virus: Polio },
      { numViruses: 3, virus: HPV },
      { numViruses: 3, virus: GTA_virion },
      { numViruses: 6, virus: Bacteriophage_phi29_prohead_80 },
    ],
    antibody: antibody_bacteriophage_phi29_prohead,
    assets: [
      "/models/cells/basophil.glb",
      "/models/viruses/bacteriophage_phi29_prohead_80.glb",
      "/models/antibodies/antibody_hiv_10.glb",
    ],
    moveCameraTo: [0, 20, 24],
    scaleTarget: 0.0025,
    temperatureTarget: getMaxTemp(0.0025) * 0.45,
    Spring: () => {
      useSpringStoreImmediately({
        property: "ceilingHeight",
        target: 30,
        springConfig: {
          mass: 1,
          tension: 170,
          friction: 10,
          precision: 0.0001,
        },
      });
      return null;
    },
  },
  {
    viruses: [
      { numViruses: 1, virus: Polio },
      { numViruses: 1, virus: HPV },
      { numViruses: 3, virus: GTA_virion },
      { numViruses: 8, virus: Bacteriophage_phi29_prohead_80 },
      { numViruses: 1, virus: Faustovirus },
    ],
    antibody: antibody_faustovirus,
    assets: ["/models/viruses/faust_1200_1.glb"],
    scaleTarget: 0.0025,
    temperatureTarget: getMaxTemp(0.0025) * 0.5,
    Spring: () => {
      useSpringStoreImmediately({
        property: "ceilingHeight",
        target: 36,
        springConfig: {
          mass: 1,
          tension: 170,
          friction: 10,
          precision: 0.0001,
        },
      });
      return null;
    },
  },
];

export function SpringScaleToTarget({ target }) {
  const setScale = useStore((s) => s.setScale);
  useSpringStoreImmediately({
    property: "scale",
    target: target,
    springConfig: {
      mass: 1,
      tension: 170,
      friction: 50,
      // precision: 0.0001,
    },
    setterFn: setScale,
  });
  return null;
}

export function SpringTemperatureToTarget({ target }) {
  const setTemperature = useStore((s) => s.setTemperature);
  useSpringStoreImmediately({
    property: "temperature",
    target: target,
    springConfig: {
      mass: 1,
      tension: 170,
      friction: 50,
      // precision: 0.0001,
    },
    setterFn: setTemperature,
  });
  return null;
}
