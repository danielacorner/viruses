import SarsCov2 from "../components/GLTFs/SarsCov2";
import Model1bv1 from "../components/GLTFs/1bv1";
import ModelNqo1 from "../components/GLTFs/nqo1_holo_form";
import ModelAntibody from "../components/GLTFs/antibody";

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
		name: "SarsCov2",
		particle: SarsCov2,
		mass: 1,
		scale: 0.005,
		pathToGLTF: "/models/SarsCov2/scene.gltf",
		interactive: true,
	},
	{
		name: "antibody",
		particle: ModelAntibody,
		mass: 0.05,
		scale: 0.005,
		pathToGLTF: "/models/antibody/scene.gltf",
		interactive: true,
	},
	{
		name: "1bv1",
		particle: Model1bv1,
		mass: 0.05,
		scale: 0.005,
		pathToGLTF: "/models/1bv1/scene.gltf",
		interactive: true,
	},
	{
		name: "nqo1",
		particle: ModelNqo1,
		mass: 0.05,
		scale: 0.005,
		pathToGLTF: "/models/nqo1_holo_form/scene.gltf",
		interactive: false,
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
