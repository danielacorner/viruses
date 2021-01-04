// viruses
import Adenovirus_160_outer from "../components/GLTFs/viruses/Adenovirus_160_outer";
import Herpes_600 from "../components/GLTFs/viruses/Herpes_600";
import Rice_dwarf_100 from "../components/GLTFs/viruses/Rice_dwarf_100";
import Faust_1200_1 from "../components/GLTFs/viruses/Faust_1200_1";
import Nodavirus_40_radial from "../components/GLTFs/viruses/Nodavirus_40_radial";
import SH1_140 from "../components/GLTFs/viruses/SH1_140";
import Haloarcula_californiae_140 from "../components/GLTFs/viruses/Haloarcula_californiae_140";
import Varicella_zoster_300 from "../components/GLTFs/viruses/Varicella_zoster_300";
import HIV_200 from "../components/GLTFs/viruses/HIV_200";
import Spiroplasma_50 from "../components/GLTFs/viruses/Spiroplasma_50";
// antibodies
import Antibody_hiv from "../components/GLTFs/antibodies/Antibody_hiv";
import Antibody_herpes from "../components/GLTFs/antibodies/Antibody_herpes";
// cells
import Eosinophil from "../components/GLTFs/cells/Eosinophil";
import Basophil from "../components/GLTFs/cells/Basophil";
import Lymphocyte from "../components/GLTFs/cells/Lymphocyte";
// other
import Cell_membrane from "../components/GLTFs/other/Cell_membrane";

export const PROTEIN_TYPES = {
  antibody: "antibody",
  virus: "virus",
  cell: "cell",
  other: "other",
};

type Protein = {
  /** Particle component to render */
  Component: (props: any) => JSX.Element;
  /** display name */
  name: string;
  /** url to Protein Data Bank entry */
  PDBUrl: string;
  /** virus, antibody... */
  type: string;
  /** weight in kDA. heavier = spins less & interacts more heavily with other objects */
  mass: number;
  /** how many atoms? used to estimate particle radius */
  atomCount: number /* TECHDEBT: can find actual particleRadius instead? */;
  /** how big is the rendered particle compared to the actual model size */
  scale?: number;
  /** path to the model's .gltf file (unused?) */
  pathToGLTF: string;
  /** path to the high-res image of the virus */
  pathToImage: string;
  /** does the particle bump into others? (may cost more CPU) */
  interactive: boolean;
  /** if interactive, how many faces does the geometry have?
   * determined shape for physics interactions in useConvexPolyhedron
   *
   * typically "Icosahedral" meaning 20 sides - found in the PDB entry under "Global Symmetry" */
  numIcosahedronFaces: number;
};

export const PROTEINS: Protein[] = [
  {
    Component: Adenovirus_160_outer,
    name: "Adenovirus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6CGV",
    mass: 1532.27,
    atomCount: 99723,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/adenovirus_160_outer.glb",
    pathToImage: "/models/viruses/adenovirus.png",
    interactive: true,
  },
  {
    Component: Herpes_600,
    name: "Herpes",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6CGR",
    mass: 4031.74,
    atomCount: 219702,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/Herpes_600.glb",
    pathToImage: "/models/viruses/herpes.png",
    interactive: true,
  },
  {
    Component: Nodavirus_40_radial,
    name: "Penaeus vannamei nodavirus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6AB6",
    mass: 121.03,
    atomCount: 7256,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/Penaeus vannamei nodavirus_40_radial.glb",
    pathToImage: "/models/viruses/Penaeus vannamei nodavirus_radial.png",
    interactive: true,
  },
  {
    Component: SH1_140,
    name: "SH1 virus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6QT9",
    mass: 604.19,
    atomCount: 42370,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/SH1_140.glb",
    pathToImage: "/models/viruses/SH1_hd.png",
    interactive: true,
  },
  {
    Component: Faust_1200_1,
    name: "Faustovirus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/5J7V",
    mass: 215.35,
    atomCount: 14478,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/faust_1200_1.glb",
    pathToImage: "/models/viruses/Faustovirus.png",
    interactive: true,
  },
  {
    Component: Rice_dwarf_100,
    name: "Rice dwarf virus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/1UF2",
    mass: 889.08,
    atomCount: 58130,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/Rice_dwarf_100.glb",
    pathToImage: "/models/viruses/Rice dwarf Virus (RDV).png",
    interactive: true,
  },
  {
    Component: Haloarcula_californiae_140,
    name: "Haloarcula californiae",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6H9C",
    mass: 648.0,
    atomCount: 43691,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/Haloarcula_californiae_140.glb",
    pathToImage: "/models/viruses/Haloarcula hispanica.png",
    interactive: true,
  },
  {
    Component: Varicella_zoster_300,
    name: "Varicella Zoster (Chicken Pox)",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6LGL",
    mass: 3463.29,
    atomCount: 208346,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/varicella_zoster_300.glb",
    pathToImage: "/models/viruses/Varicella_zoster.png",
    interactive: true,
  },
  {
    Component: HIV_200,
    name: "HIV",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/3J3Y",
    mass: 30226.13,
    atomCount: 2116800,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/HIV_200.glb",
    pathToImage: "/models/viruses/HIV.png",
    interactive: true,
  },
  {
    Component: Spiroplasma_50,
    name: "Spiroplasma",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/1KVP",
    mass: 55.83,
    atomCount: 497,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/viruses/Spiroplasma_50.glb",
    pathToImage: "/models/viruses/Spiroplasma.png",
    interactive: true,
  },
  // ANTIBODIES
  // ANTIBODIES
  // ANTIBODIES
  // ANTIBODIES
  {
    Component: Antibody_hiv,
    name: "anti-HIV Antibody",
    type: PROTEIN_TYPES.antibody,
    PDBUrl: "https://www.rcsb.org/structure/3RPI",
    mass: 96.41,
    atomCount: 6650,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/antibodies/antibody_hiv.glb",
    pathToImage: "/models/antibodies/antibody_HIV.png",
    interactive: true,
  },
  {
    Component: Antibody_herpes,
    name: "anti-Herpes Antibody",
    type: PROTEIN_TYPES.antibody,
    PDBUrl: "https://www.rcsb.org/structure/3W9E",
    mass: 81.86,
    atomCount: 5355,
    numIcosahedronFaces: 20,
    pathToGLTF: "/models/antibodies/antibody_herpes.glb",
    pathToImage: "/models/antibodies/antibody_Herpes.png",
    interactive: true,
  },
  // {
  //   Component: Lymphocyte,
  //   name: "Lymphocyte",
  //   type: PROTEIN_TYPES.cell,
  //   PDBUrl: "https://en.wikipedia.org/wiki/Lymphocyte",
  //   mass: 5000,
  //   atomCount: 5000,
  //   numIcosahedronFaces: 20,
  //   pathToGLTF: "/models/cells/lymphocyte.gltf",
  //   pathToImage: "/models/cells/lymphocyte.png",
  //   interactive: true,
  // },
  // {
  //   Component: Eosinophil,
  //   name: "Eosinophil",
  //   type: PROTEIN_TYPES.cell,
  //   PDBUrl: "https://en.wikipedia.org/wiki/Eosinophil",
  //   mass: 9999999,
  //   atomCount: 9999999,
  //   numIcosahedronFaces: 20,
  //   pathToGLTF: "/models/cells/eosinophil.glb",
  //   pathToImage: "/models/cells/eosinophil.png",
  //   interactive: true,
  // },
  // {
  //   Component: Basophil,
  //   name: "Basophil",
  //   type: PROTEIN_TYPES.cell,
  //   PDBUrl: "https://en.wikipedia.org/wiki/Basophil",
  //   mass: 9999999,
  //   atomCount: 9999999,
  //   numIcosahedronFaces: 20,
  //   pathToGLTF: "/models/cells/basophil.glb",
  //   pathToImage: "/models/cells/basophil.png",
  //   interactive: true,
  // },
  // {
  //   Component: Cell_membrane,
  //   name: "Cell_membrane",
  //   type: PROTEIN_TYPES.other,
  //   PDBUrl: "https://en.wikipedia.org/wiki/Cell_membrane",
  //   mass: 9999999,
  //   atomCount: 9999999,
  //   numIcosahedronFaces: 20,
  //   pathToGLTF: "/models/cells/cell_membrane.gltf",
  //   pathToImage: "/models/cells/cell_membrane.jpg",
  //   interactive: true,
  // },
];
