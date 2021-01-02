import Adenovirus_160_outer from "../components/GLTFs/viruses/Adenovirus_160_outer";

type Protein = {
  /** display name */
  name: string;
  /** Particle component to render */
  particle: (props: any) => JSX.Element;
  /** heavier = spins less & interacts more heavily with other objects */
  mass: number;
  /** how big is the rendered particle compared to the actual model size */
  scale: number;
  /** path to the model's .gltf file (unused?) */
  pathToGLTF: string;
  /** does the particle bump into others? (may cost more CPU) */
  interactive: boolean;
};

export const PROTEINS: Protein[] = [
  {
    name: "Adenovirus",
    particle: Adenovirus_160_outer,
    mass: 1,
    scale: 0.005,
    pathToGLTF: "/models/viruses/adenovirus_160_outer.glb",
    interactive: true,
  },

];

export const PHYSICS_PROPS = {
  defaultContactMaterial: {
    friction: 0.9,
    restitution: 0.7,
    contactEquationStiffness: 1e7,
    contactEquationRelaxation: 1,
    frictionEquationStiffness: 1e7,
    frictionEquationRelaxation: 2,
  },
  gravity: [0, 0, 0],
};
