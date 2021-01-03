import Adenovirus_160_outer from "../components/GLTFs/viruses/Adenovirus_160_outer";
import Herpes_600 from "../components/GLTFs/viruses/Herpes_600";
import Rice_dwarf_100 from "../components/GLTFs/viruses/Rice_dwarf_100";
import Faust_1200_1 from "../components/GLTFs/viruses/Faust_1200_1";

type Protein = {
	/** Particle component to render */
	particle: (props: any) => JSX.Element;
	/** display name */
	name: string;
	/** url to Protein Data Bank entry */
	PDBurl?: string;
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
		particle: Adenovirus_160_outer,
		name: "Adenovirus",
		PDBurl: "https://www.rcsb.org/structure/6CGV",
		mass: 1532.27,
		atomCount: 99723,
		numIcosahedronFaces: 20,
		pathToGLTF: "/models/viruses/adenovirus_160_outer.glb",
		pathToImage: "/images/adenovirus.png",
		interactive: true,
	},
	{
		particle: Herpes_600,
		name: "Herpes",
		PDBurl: "https://www.rcsb.org/structure/6CGR",
		mass: 4031.74,
		atomCount: 219702,
		numIcosahedronFaces: 20,
		pathToGLTF: "/models/viruses/Herpes_600.glb",
		pathToImage: "/images/herpes.png",
		interactive: true,
	},
	{
		particle: Faust_1200_1,
		name: "Faustovirus",
		PDBurl: "https://www.rcsb.org/structure/5J7V",
		mass: 215.35,
		atomCount: 14478,
		numIcosahedronFaces: 20,
		pathToGLTF: "/models/viruses/faust_1200_1.glb",
		pathToImage: "/images/Faustovirus.png",
		interactive: true,
	},
	{
		particle: Rice_dwarf_100,
		name: "Rice dwarf virus",
		PDBurl: "https://www.rcsb.org/structure/1UF2",
		mass: 889.08,
		atomCount: 58130,
		numIcosahedronFaces: 20,
		pathToGLTF: "/models/viruses/Rice_dwarf_100.glb",
		pathToImage: "/images/Rice dwarf Virus (RDV).png",
		interactive: true,
	},
];
