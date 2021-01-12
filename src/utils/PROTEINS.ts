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
import Sindbis_70 from "../components/GLTFs/viruses/Sindbis_70";
import Poliovirus_50 from "../components/GLTFs/viruses/Poliovirus_50";
import Denguevirus_50 from "../components/GLTFs/viruses/Denguevirus_50";
import HPV_100 from "../components/GLTFs/viruses/HPV_100";
// antibodies
import Antibody_hiv_10 from "../components/GLTFs/antibodies/Antibody_hiv_10";
import Antibody_herpes from "../components/GLTFs/antibodies/Antibody_herpes";
// nanotech
import Protein_cage_20 from "../components/GLTFs/nanotech/Protein_cage_20";
import Dna_origami_object_80 from "../components/GLTFs/nanotech/Dna_origami_object_80";
import Six_fold_symmetric_dna_scaffold_10 from "../components/GLTFs/nanotech/Six_fold_symmetric_dna_scaffold_10";
import Computationally_designed_mini_tetraloop_tetraloop_receptor_10 from "../components/GLTFs/nanotech/Computationally_designed_mini_tetraloop_tetraloop_receptor_10";
import A_circularly_permuted_pdu_a_forming_an_icosahedral_cage_20 from "../components/GLTFs/nanotech/A_circularly_permuted_pdu_a_forming_an_icosahedral_cage_20";
import Color_device_state_a_10 from "../components/GLTFs/nanotech/Color_device_state_a_10";
import Octahedral_nanoparticle_20 from "../components/GLTFs/nanotech/Octahedral_nanoparticle_20";
import Tetrahedral_nanoparticle_20 from "../components/GLTFs/nanotech/Tetrahedral_nanoparticle_20";
import Icosahedral_nanoparticle_20 from "../components/GLTFs/nanotech/Icosahedral_nanoparticle_20";
// cells
import Eosinophil from "../components/GLTFs/cells/Eosinophil";
import Basophil from "../components/GLTFs/cells/Basophil";
import Lymphocyte from "../components/GLTFs/cells/Lymphocyte";
// other
import Cell_membrane from "../components/GLTFs/other/Cell_membrane";

export const PROTEIN_TYPES = {
  antibody: "antibody",
  nanotech: "nanotech",
  virus: "virus",
  cell: "cell",
  other: "other",
};

export type Protein = {
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
  /** ! is this accurate, or is it in the asymmetric unit only? e.g. Faustovirus seems too light how many atoms? used to estimate particle radius */
  atomCount: number /* TECHDEBT: can find actual particleRadius instead? */;
  /** radius in Angstroms measured in ChimeraX using the Right Mouse > Distance annotation tool */
  radius: number;
  /** how big is the rendered particle compared to the actual model size */
  scale?: number;
  /** path to the model's .gltf file (unused?) */
  pathToGLTF: string;
  /** path to the high-res image of the virus */
  pathToImage: string;
  /** does the particle bump into others? (may cost more CPU) */
  interactive: boolean;
  /** PubMed Abstract text */
  pubmedAbstract: string;
  /** if interactive, how many faces does the geometry have?
   * determined shape for physics interactions in useConvexPolyhedron
   *
   * typically "Icosahedral" meaning 20 sides - found in the PDB entry under "Global Symmetry" */
  numIcosahedronFaces: number;
  numAsymmetricUnits: number;
};

export const PROTEINS: Protein[] = [
  // VIRUSES
  // VIRUSES
  // VIRUSES
  // VIRUSES
  {
    Component: Adenovirus_160_outer,
    name: "Adenovirus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6CGV",
    mass: 1532.27,
    // atomCount: 99723, // PDB
    radius: 450, // measured using PDB 3d viewer e.g. https://www.rcsb.org/3d-view/6CGR/1
    atomCount: 200268, // ChimeraX ??
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/adenovirus_160_outer.glb",
    pathToImage: "/models/viruses/adenovirus.webp",
    interactive: true,
    pubmedAbstract:
      "We report the revised crystal structure of a pseudo-typed human adenovirus at 3.8-Å resolution that is consistent with the atomic models of minor proteins determined by cryo-electron microscopy. The diffraction data from multiple crystals were rescaled and merged to increase the data completeness. The densities for the minor proteins were initially identified in the phase-refined omit maps that were further improved by the phases from docked poly-alanine models to build atomic structures. While the trimeric fiber molecules are disordered due to flexibility and imposition of 5-fold symmetry, the remaining major capsid proteins hexon and penton base are clearly ordered, with the exception of hypervariable region 1 of hexons, the RGD containing loop, and the N-termini of the penton base. The exterior minor protein IX together with the interior minor proteins IIIa and VIII stabilizes the adenovirus virion. A segment of N-terminal pro-peptide of VI is found in the interior cavities of peripentonal hexons, and the rest of VI is disordered. While the triskelion substructures formed by the N-termini of IX conform to excellent quasi 3-fold symmetry, the tetrameric coiled-coils formed by the C-termini and organized in parallel and anti-parallel arrangement do not exhibit any quasi-symmetry. This observation also conveys the pitfalls of using the quasi-equivalence as validation criteria for the structural analysis of extended (non-modular) capsid proteins such as IX. Together, these results remedy certain discrepancies in the previous X-ray model in agreement with the cryo-electron microscopy models.",
  },
  {
    Component: Herpes_600,
    name: "Herpes",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6CGR",
    mass: 4031.74,
    atomCount: 219702,
    radius: 525, // measured using PDB 3d viewer e.g. https://www.rcsb.org/3d-view/6CGR/1
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/Herpes_600.glb",
    pathToImage: "/models/viruses/herpes.webp",
    interactive: true,
    pubmedAbstract:
      "Herpes simplex viruses (HSVs) rely on capsid-associated tegument complex (CATC) for long-range axonal transport of their genome-containing capsids between sites of infection and neuronal cell bodies. Here we report cryo-electron microscopy structures of the HSV-1 capsid with CATC up to 3.5-angstrom resolution and atomic models of multiple conformers of capsid proteins VP5, VP19c, VP23, and VP26 and tegument proteins pUL17, pUL25, and pUL36. Crowning every capsid vertex are five copies of heteropentameric CATC, each containing a pUL17 monomer supporting the coiled-coil helix bundle of a pUL25 dimer and a pUL36 dimer, thus positioning their flexible domains for potential involvement in nuclear capsid egress and axonal capsid transport. Notwithstanding newly discovered fold conservation between triplex proteins and bacteriophage λ protein gpD and the previously recognized bacteriophage HK97 gp5-like fold in VP5, HSV-1 capsid proteins exhibit extraordinary diversity in forms of domain insertion and conformational polymorphism, not only for interactions with tegument proteins but also for encapsulation of large genomes.",
  },
  {
    Component: Nodavirus_40_radial,
    name: "Penaeus vannamei nodavirus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6AB6",
    mass: 121.03,
    atomCount: 7256,
    radius: 180,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/Penaeus vannamei nodavirus_40_radial.glb",
    pathToImage: "/models/viruses/Penaeus vannamei nodavirus_radial.png",
    interactive: true,
    pubmedAbstract:
      "Shrimp nodaviruses, including Penaeus vannamei (PvNV) and Macrobrachium rosenbergii nodaviruses (MrNV), cause white-tail disease in shrimps, with high mortality. The viral capsid structure determines viral assembly and host specificity during infections. Here, we show cryo-EM structures of T  = 3 and T  = 1 PvNV-like particles (PvNV-LPs), crystal structures of the protrusion-domains (P-domains) of PvNV and MrNV, and the crystal structure of the ∆N-ARM-PvNV shell-domain (S-domain) in T  = 1 subviral particles. The capsid protein of PvNV reveals five domains: the P-domain with a new jelly-roll structure forming cuboid-like spikes; the jelly-roll S-domain with two calcium ions; the linker between the S- and P-domains exhibiting new cross and parallel conformations; the N-arm interacting with nucleotides organized along icosahedral two-fold axes; and a disordered region comprising the basic N -terminal arginine-rich motif (N-ARM) interacting with RNA. The N-ARM controls T  = 3 and T  = 1 assemblies. Increasing the N / C -termini flexibility leads to particle polymorphism. Linker flexibility may influence the dimeric-spike arrangement.",
  },
  {
    Component: SH1_140,
    name: "SH1 virus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6QT9",
    mass: 604.19,
    atomCount: 42370,
    radius: 400,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/SH1_140.glb",
    pathToImage: "/models/viruses/sh1.webp",
    interactive: true,
    pubmedAbstract:
      "Many of the largest known viruses belong to the PRD1-adeno structural lineage characterised by conserved pseudo-hexameric capsomers composed of three copies of a single major capsid protein (MCP). Here, by high-resolution cryo-EM analysis, we show that a class of archaeal viruses possess hetero-hexameric MCPs which mimic the PRD1-adeno lineage trimer. These hetero-hexamers are built from heterodimers and utilise a jigsaw-puzzle system of pegs and holes, and underlying minor capsid proteins, to assemble the capsid laterally from the 5-fold vertices. At these vertices proteins engage inwards with the internal membrane vesicle whilst 2-fold symmetric horn-like structures protrude outwards. The horns are assembled from repeated globular domains attached to a central spine, presumably facilitating multimeric attachment to the cell receptor. Such viruses may represent precursors of the main PRD1-adeno lineage, similarly engaging cell-receptors via 5-fold spikes and using minor proteins to define particle size.",
  },
  {
    Component: Faust_1200_1,
    name: "Faustovirus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/5J7V",
    mass: 215.35,
    radius: 1210, // measured in ChimeraX
    // atomCount: 14478, // PDB
    atomCount: 28956, // ChimeraX "select all"
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/faust_1200_1.glb",
    pathToImage: "/models/viruses/faustovirus.webp",
    interactive: true,
    pubmedAbstract:
      "Many viruses protect their genome with a combination of a protein shell with or without a membrane layer. Here we describe the structure of faustovirus, the first DNA virus (to our knowledge) that has been found to use two protein shells to encapsidate and protect its genome. The crystal structure of the major capsid protein, in combination with cryo-electron microscopy structures of two different maturation stages of the virus, shows that the outer virus shell is composed of a double jelly-roll protein that can be found in many double-stranded DNA viruses. The structure of the repeating hexameric unit of the inner shell is different from all other known capsid proteins. In addition to the unique architecture, the region of the genome that encodes the major capsid protein stretches over 17,000 bp and contains a large number of introns and exons. This complexity might help the virus to rapidly adapt to new environments or hosts.",
  },
  {
    Component: Rice_dwarf_100,
    name: "Rice dwarf virus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/1UF2",
    mass: 889.08,
    atomCount: 58130,
    radius: 360,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/Rice_dwarf_100.glb",
    pathToImage: "/models/viruses/rice_dwarf_virus.webp",
    interactive: true,
    pubmedAbstract:
      "Rice dwarf virus (RDV), the causal agent of rice dwarf disease, is a member of the genus Phytoreovirus in the family Reoviridae. RDV is a double-shelled virus with a molecular mass of approximately 70 million Dalton. This virus is widely prevalent and is one of the viruses that cause the most economic damage in many Asian countries. The atomic structure of RDV was determined at 3.5 A resolution by X-ray crystallography. The double-shelled structure consists of two different proteins, the core protein P3 and the outer shell protein P8. The atomic structure shows structural and electrostatic complementarities between both homologous (P3-P3 and P8-P8) and heterologous (P3-P8) interactions, as well as overall conformational changes found in P3-P3 dimer caused by the insertion of amino-terminal loop regions of one of the P3 protein into the other. These interactions suggest how the 900 protein components are built into a higher-ordered virus core structure.",
  },
  {
    Component: Haloarcula_californiae_140,
    name: "Haloarcula californiae",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/6H9C",
    mass: 648.0,
    atomCount: 43691,
    radius: 390,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/Haloarcula_californiae_140.glb",
    pathToImage: "/models/viruses/Haloarcula hispanica.png",
    interactive: true,
    pubmedAbstract:
      "The vertical double β-barrel major capsid protein (MCP) fold, fingerprint of the PRD1-adeno viral lineage, is widespread in many viruses infecting organisms across the three domains of life. The discovery of PRD1-like viruses with two MCPs challenged the known assembly principles. Here, we present the cryo-electron microscopy (cryo-EM) structures of the archaeal, halophilic, internal membrane-containing Haloarcula californiae icosahedral virus 1 (HCIV-1) and Haloarcula hispanica icosahedral virus 2 (HHIV-2) at 3.7 and 3.8 Å resolution, respectively. Our structures reveal proteins located beneath the morphologically distinct two- and three-tower capsomers and homopentameric membrane proteins at the vertices that orchestrate the positioning of pre-formed vertical single β-barrel MCP heterodimers. The cryo-EM based structures together with the proteomics data provide insights into the assembly mechanism of this type of viruses and into those with membrane-less double β-barrel MCPs.",
  },
  {
    Component: Varicella_zoster_300,
    name: "Chicken Pox (Varicella Zoster)",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/7BW6",
    mass: 3463.29,
    atomCount: 208346,
    radius: 588,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/varicella_zoster_300.glb",
    pathToImage: "/models/viruses/varicella_zoster.webp",
    interactive: true,
    pubmedAbstract:
      "Varicella-zoster virus (VZV), a member of the Alphaherpesvirinae subfamily, causes severe diseases in humans of all ages. The viral capsids play critical roles in herpesvirus infection, making them potential antiviral targets. Here, we present the 3.7-Å-resolution structure of the VZV A-capsid and define the molecular determinants underpinning the assembly of this complicated viral machinery. Overall, the VZV capsid has a similar architecture to that of other known herpesviruses. The major capsid protein (MCP) assembles into pentons and hexons, forming extensive intra- and inter-capsomer interaction networks that are further secured by the small capsid protein (SCP) and the heterotriplex. The structure reveals a pocket beneath the floor of MCP that could potentially be targeted by antiviral inhibitors. In addition, we identified two alphaherpesvirus-specific structural features in SCP and Tri1 proteins. These observations highlight the divergence of different herpesviruses and provide an important basis for developing antiviral drugs.",
  },
  {
    Component: HIV_200,
    name: "HIV",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/3J3Y",
    mass: 30226.13,
    atomCount: 2116800,
    radius: 540,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/HIV_200.glb",
    pathToImage: "/models/viruses/hiv.webp",
    interactive: true,
    pubmedAbstract:
      "Retroviral capsid proteins are conserved structurally but assemble into different morphologies. The mature human immunodeficiency virus-1 (HIV-1) capsid is best described by a 'fullerene cone' model, in which hexamers of the capsid protein are linked to form a hexagonal surface lattice that is closed by incorporating 12 capsid-protein pentamers. HIV-1 capsid protein contains an amino-terminal domain (NTD) comprising seven α-helices and a β-hairpin, a carboxy-terminal domain (CTD) comprising four α-helices, and a flexible linker with a 310-helix connecting the two structural domains. Structures of the capsid-protein assembly units have been determined by X-ray crystallography; however, structural information regarding the assembled capsid and the contacts between the assembly units is incomplete. Here we report the cryo-electron microscopy structure of a tubular HIV-1 capsid-protein assembly at 8 Å resolution and the three-dimensional structure of a native HIV-1 core by cryo-electron tomography. The structure of the tubular assembly shows, at the three-fold interface, a three-helix bundle with critical hydrophobic interactions. Mutagenesis studies confirm that hydrophobic residues in the centre of the three-helix bundle are crucial for capsid assembly and stability, and for viral infectivity. The cryo-electron-microscopy structures enable modelling by large-scale molecular dynamics simulation, resulting in all-atom models for the hexamer-of-hexamer and pentamer-of-hexamer elements as well as for the entire capsid. Incorporation of pentamers results in closer trimer contacts and induces acute surface curvature. The complete atomic HIV-1 capsid model provides a platform for further studies of capsid function and for targeted pharmacological intervention.",
  },
  {
    Component: Spiroplasma_50,
    name: "Spiroplasma SPV4",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/1KVP",
    mass: 55.83,
    atomCount: 497,
    radius: 175,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/Spiroplasma_50.glb",
    pathToImage: "/models/viruses/Spiroplasma_SPV4.webp",
    interactive: true,
    pubmedAbstract:
      "Spiroplasma virus, SpV4, is a small, non-enveloped virus that infects the helical mollicute Spiroplasma melliferum. SpV4 exhibits several similarities to the Chlamydia phage, Chp1, and the Coliphages alpha 3, phi K, G4 and phi X174. All of these viruses are members of the Microviridae. These viruses have isometric capsids with T = 1 icosahedral symmetry, cause lytic infections and are the only icosahedral phages that contain single-stranded circular DNA genomes. The aim of this comparative study on these phages was to understand the role of their capsid proteins during host receptor recognition.",
  },
  {
    Component: Sindbis_70,
    name: "Sindbis virus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/1Z8Y",
    mass: 258.38,
    atomCount: 18071,
    radius: 300,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/Sindbis_70.glb",
    pathToImage: "/models/viruses/sindbis.webp",
    interactive: true,
    pubmedAbstract:
      "The 9 A resolution cryo-electron microscopy map of Sindbis virus presented here provides structural information on the polypeptide topology of the E2 protein, on the interactions between the E1 and E2 glycoproteins in the formation of a heterodimer, on the difference in conformation of the two types of trimeric spikes, on the interaction between the transmembrane helices of the E1 and E2 proteins, and on the conformational changes that occur when fusing with a host cell. The positions of various markers on the E2 protein established the approximate topology of the E2 structure. The largest conformational differences between the icosahedral surface spikes at icosahedral 3-fold and quasi-3-fold positions are associated with the monomers closest to the 5-fold axes. The long E2 monomers, containing the cell receptor recognition motif at their extremities, are shown to rotate by about 180 degrees and to move away from the center of the spikes during fusion.",
  },
  {
    Component: Poliovirus_50,
    name: "Poliovirus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/1PO2",
    mass: 98.54,
    atomCount: 6688,
    radius: 160,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/poliovirus_50.glb",
    pathToImage: "/models/viruses/poliovirus.webp",
    interactive: true,
    pubmedAbstract:
      "Crystal structures of the Mahoney strain of type 1 poliovirus complexed with the antiviral compounds R80633 and R77975 were determined at 2.9 A resolution. These compounds block infection by preventing conformational changes required for viral uncoating. In various drug-poliovirus complexes reported earlier, no significant conformational changes were found in the structures of the capsid proteins. In the structures reported here, the strain of virus is relatively insensitive to these antivirals. Correspondingly, significant conformational changes are necessary to accommodate the drug. These conformational changes affect both the immediate vicinity of the drug binding site, and more distant loops located near the fivefold axis. In addition, small but concerted shifts of the centers of mass of the major capsid proteins consistently have been detected whose magnitudes are correlated inversely with the effectiveness of the drugs. Collectively, the drug complexes appear to sample the conformational repertoire of poliovirus near equilibrium, and thus provide a possible model for the earliest stages of viral uncoating during infection.",
  },
  {
    Component: Denguevirus_50,
    name: "Denguevirus",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/3J05",
    mass: 131.25,
    atomCount: 1128,
    radius: 285,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 20,
    pathToGLTF: "/models/viruses/denguevirus_50.glb",
    pathToImage: "/models/viruses/denguevirus.webp",
    interactive: true,
    pubmedAbstract:
      "Dengue virus (DENV) is a mosquito-borne flavivirus that affects 2.5 billion people worldwide. There are four dengue serotypes (DENV1 to DENV4), and infection with one elicits lifelong immunity to that serotype but offers only transient protection against the other serotypes. Identification of the protective determinants of the human antibody response to DENV is a vital requirement for the design and evaluation of future preventative therapies and treatments. Here, we describe the isolation of a neutralizing antibody from a DENV1-infected patient. The human antibody 14c10 (HM14c10) binds specifically to DENV1. HM14c10 neutralizes the virus principally by blocking virus attachment; at higher concentrations, a post-attachment step can also be inhibited. In vivo studies show that the HM14c10 antibody has antiviral activity at picomolar concentrations. A 7 Å resolution cryoelectron microscopy map of Fab fragments of HM14c10 in a complex with DENV1 shows targeting of a discontinuous epitope that spans the adjacent surface of envelope protein dimers. As found previously, a human antibody specific for the related West Nile virus binds to a similar quaternary structure, suggesting that this could be an immunodominant epitope. These findings provide a structural and molecular context for durable, serotype-specific immunity to DENV infection.",
  },
  {
    Component: HPV_100,
    name: "Human Papillomavirus (HPV)",
    type: PROTEIN_TYPES.virus,
    PDBUrl: "https://www.rcsb.org/structure/3J6R",
    mass: 1575,
    atomCount: 424596,
    radius: 280,
    numIcosahedronFaces: 12,
    numAsymmetricUnits: 12,
    pathToGLTF: "/models/viruses/hpv_100.glb",
    pathToImage: "/models/viruses/hpv.webp",
    interactive: true,
    pubmedAbstract:
      "Papillomaviruses are a family of nonenveloped DNA viruses that infect the skin or mucosa of their vertebrate hosts. The viral life cycle is closely tied to the differentiation of infected keratinocytes. Papillomavirus virions are released into the environment through a process known as desquamation, in which keratinocytes lose structural integrity prior to being shed from the surface of the skin. During this process, virions are exposed to an increasingly oxidative environment, leading to their stabilization through the formation of disulfide cross-links between neighboring molecules of the major capsid protein, L1. We used time-lapse cryo-electron microscopy and image analysis to study the maturation of HPV16 capsids assembled in mammalian cells and exposed to an oxidizing environment after cell lysis. Initially, the virion is a loosely connected procapsid that, under in vitro conditions, condenses over several hours into the more familiar 60-nm-diameter papillomavirus capsid. In this process, the procapsid shrinks by ~5% in diameter, its pentameric capsomers change in structure (most markedly in the axial region), and the interaction surfaces between adjacent capsomers are consolidated. A C175S mutant that cannot achieve normal inter-L1 disulfide cross-links shows maturation-related shrinkage but does not achieve the fully condensed 60-nm form. Pseudoatomic modeling based on a 9-Å resolution reconstruction of fully mature capsids revealed C-terminal disulfide-stabilized 'suspended bridges' that form intercapsomeric cross-links. The data suggest a model in which procapsids exist in a range of dynamic intermediates that can be locked into increasingly mature configurations by disulfide cross-linking, possibly through a Brownian ratchet mechanism. Importance: Human papillomaviruses (HPVs) cause nearly all cases of cervical cancer, a major fraction of cancers of the penis, vagina/vulva, anus, and tonsils, and genital and nongenital warts. HPV types associated with a high risk of cancer, such as HPV16, are generally transmitted via sexual contact. The nonenveloped virion of HPVs shows a high degree of stability, allowing the virus to persist in an infectious form in environmental fomites. In this study, we used cryo-electron microscopy to elucidate the structure of the HPV16 capsid at different stages of maturation. The fully mature capsid adopts a rigid, highly regular structure stabilized by intermolecular disulfide bonds. The availability of a pseudoatomic model of the fully mature HPV16 virion should help guide understanding of antibody responses elicited by HPV capsid-based vaccines.",
  },
  // ANTIBODIES
  // ANTIBODIES
  // ANTIBODIES
  // ANTIBODIES
  {
    Component: Antibody_hiv_10,
    name: "anti-HIV Antibody",
    type: PROTEIN_TYPES.antibody,
    PDBUrl: "https://www.rcsb.org/structure/3RPI",
    mass: 96.41,
    atomCount: 6650,
    radius: 50,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 1,
    pathToGLTF: "/models/antibodies/antibody_hiv_10.glb",
    pathToImage: "/models/antibodies/antibody_hiv.webp",
    interactive: true,
    pubmedAbstract:
      "Passive transfer of broadly neutralizing HIV antibodies can prevent infection, which suggests that vaccines that elicit such antibodies would be protective. Thus far, however, few broadly neutralizing HIV antibodies that occur naturally have been characterized. To determine whether these antibodies are part of a larger group of related molecules, we cloned 576 new HIV antibodies from four unrelated individuals. All four individuals produced expanded clones of potent broadly neutralizing CD4-binding-site antibodies that mimic binding to CD4. Despite extensive hypermutation, the new antibodies shared a consensus sequence of 68 immunoglobulin H (IgH) chain amino acids and arise independently from two related IgH genes. Comparison of the crystal structure of one of the antibodies to the broadly neutralizing antibody VRC01 revealed conservation of the contacts to the HIV spike.",
  },
  {
    Component: Antibody_herpes,
    name: "anti-Herpes Antibody",
    type: PROTEIN_TYPES.antibody,
    PDBUrl: "https://www.rcsb.org/structure/3W9E",
    mass: 81.86,
    atomCount: 5355,
    radius: 45,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 1,
    pathToGLTF: "/models/antibodies/antibody_herpes.glb",
    pathToImage: "/models/antibodies/anti_herpes_antibody.webp",
    interactive: true,
    pubmedAbstract:
      "Glycoprotein D (gD) of herpes simplex virus (HSV) binds to a host cell surface receptor, which is required to trigger membrane fusion for virion entry into the host cell. gD has become a validated anti-HSV target for therapeutic antibody development. The highly inhibitory human monoclonal antibody E317 (mAb E317) was previously raised against HSV gD for viral neutralization. To understand the structural basis of antibody neutralization, crystals of the gD ectodomain bound to the E317 Fab domain were obtained. The structure of the complex reveals that E317 interacts with gD mainly through the heavy chain, which covers a large area for epitope recognition on gD, with a flexible N-terminal and C-terminal conformation. The epitope core structure maps to the external surface of gD, corresponding to the binding sites of two receptors, herpesvirus entry mediator (HVEM) and nectin-1, which mediate HSV infection. E317 directly recognizes the gD-nectin-1 interface and occludes the HVEM contact site of gD to block its binding to either receptor. The binding of E317 to gD also prohibits the formation of the N-terminal hairpin of gD for HVEM recognition. The major E317-binding site on gD overlaps with either the nectin-1-binding residues or the neutralizing antigenic sites identified thus far (Tyr38, Asp215, Arg222 and Phe223). The epitopes of gD for E317 binding are highly conserved between two types of human herpesvirus (HSV-1 and HSV-2). This study enables the virus-neutralizing epitopes to be correlated with the receptor-binding regions. The results further strengthen the previously demonstrated therapeutic and diagnostic potential of the E317 antibody.",
  },
  // NANOTECH
  // NANOTECH
  // NANOTECH
  // NANOTECH
  {
    Component: A_circularly_permuted_pdu_a_forming_an_icosahedral_cage_20,
    name: "A circularly permuted PduA forming an icosahedral cage",
    type: PROTEIN_TYPES.nanotech,
    PDBUrl: "https://www.rcsb.org/structure/5HPN",
    mass: 43.99,
    // atomCount: 99723, // PDB
    radius: 56, // measured using PDB 3d viewer e.g. https://www.rcsb.org/3d-view/6CGR/1
    atomCount: 2890,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 12,
    pathToGLTF:
      "/models/nanotech/a_circularly_permuted_pdu_a_forming_an_icosahedral_cage_20.glb",
    pathToImage:
      "/models/nanotech/a_circularly_permuted_pdu_a_forming_an_icosahedral_cage.webp",
    interactive: true,
    pubmedAbstract:
      "We report the crystal structure of a novel 60-subunit dodecahedral cage that results from self-assembly of a re-engineered version of a natural protein (PduA) from the Pdu microcompartment shell. Biophysical data illustrate the dependence of assembly on solution conditions, opening up new applications in microcompartment studies and nanotechnology.",
  },
  {
    Component: Computationally_designed_mini_tetraloop_tetraloop_receptor_10,
    name:
      "Computationally designed mini tetraloop-tetraloop receptor by the RNAMake program",
    type: PROTEIN_TYPES.nanotech,
    PDBUrl: "https://www.rcsb.org/structure/6DVK",
    mass: 30.93,
    // atomCount: 99723, // PDB
    radius: 35, // measured using PDB 3d viewer e.g. https://www.rcsb.org/3d-view/6CGR/1
    atomCount: 2025,
    numIcosahedronFaces: 5,
    numAsymmetricUnits: 1,
    pathToGLTF:
      "/models/nanotech/computationally_designed_mini_tetraloop_tetraloop_receptor_10.glb",
    pathToImage:
      "/models/nanotech/computationally_designed_mini_tetraloop_tetraloop_receptor_by_the_rna_make_program.webp",
    interactive: true,
    pubmedAbstract:
      "RNA nanotechnology seeks to create nanoscale machines by repurposing natural RNA modules. The field is slowed by the current need for human intuition during three-dimensional structural design. Here, we demonstrate that three distinct problems in RNA nanotechnology can be reduced to a pathfinding problem and automatically solved through an algorithm called RNAMake. First, RNAMake discovers highly stable single-chain solutions to the classic problem of aligning a tetraloop and its sequence-distal receptor, with experimental validation from chemical mapping, gel electrophoresis, solution X-ray scattering and crystallography with 2.55 Å resolution. Second, RNAMake automatically generates structured tethers that integrate 16S and 23S ribosomal RNAs into single-chain ribosomal RNAs that remain uncleaved by ribonucleases and assemble onto messenger RNA. Third, RNAMake enables the automated stabilization of small-molecule binding RNAs, with designed tertiary contacts that improve the binding affinity of the ATP aptamer and improve the fluorescence and stability of the Spinach RNA in cell extracts and in living Escherichia coli cells.",
  },
  {
    Component: Six_fold_symmetric_dna_scaffold_10,
    name: "Six-Fold Symmetric DNA Scaffold",
    type: PROTEIN_TYPES.nanotech,
    PDBUrl: "https://www.rcsb.org/structure/6DKL",
    mass: 12.8,
    // atomCount: 99723, // PDB
    radius: 17, // measured using PDB 3d viewer e.g. https://www.rcsb.org/3d-view/6CGR/1
    atomCount: 851,
    numIcosahedronFaces: 5,
    numAsymmetricUnits: 1,
    pathToGLTF: "/models/nanotech/six_fold_symmetric_dna_scaffold_10.glb",
    pathToImage: "/models/nanotech/six_fold_symmetric_dna_scaffold.webp",
    interactive: true,
    pubmedAbstract:
      "Programming self-assembled designer DNA crystals with various lattices and functions is one of the most important goals for nanofabrication using nucleic acids. The resulting porous materials possess atomic precision for several potential applications that rely on crystalline lattices and cavities. Herein, we present a rationally designed and self-assembled 3D DNA crystal lattice with hexagonal symmetry. In our design, two 21-base oligonucleotides are used to form a duplex motif that further assembles into a 3D array. The interactions between the strands are programmed using Watson-Crick base-pairing. The six-fold symmetry, as well as the chirality, is directed by the Holliday junctions formed between the duplex motifs. The rationally designed DNA crystal provides a new avenue that could create self-assembled macromolecular 3D crystalline lattices with atomic precision. In addition, the structure contains a highly organized array of well-defined cavities that are suitable for future applications with immobilized guests.",
  },
  {
    Component: Color_device_state_a_10,
    name: "Color device state A",
    type: PROTEIN_TYPES.nanotech,
    PDBUrl: "https://www.rcsb.org/structure/5I36",
    mass: 40.16,
    // atomCount: 99723, // PDB
    radius: 35, // measured using PDB 3d viewer e.g. https://www.rcsb.org/3d-view/6CGR/1
    atomCount: 2664,
    numIcosahedronFaces: 5,
    numAsymmetricUnits: 1,
    pathToGLTF: "/models/nanotech/color_device_state_a_10.glb",
    pathToImage: "/models/nanotech/color_device_state_a.webp",
    interactive: true,
    pubmedAbstract:
      "Structural DNA nanotechnology finds applications in numerous areas, but the construction of objects, 2D and 3D crystalline lattices and devices is prominent among them. Each of these components has been developed individually, and most of them have been combined in pairs. However, to date there are no reports of independent devices contained within 3D crystals. Here we report a three-state 3D device whereby we change the colour of the crystals by diffusing strands that contain dyes in or out of the crystals through the mother-liquor component of the system. Each colouring strand is designed to pair with an extended triangle strand by Watson-Crick base pairing. The arm that contains the dyes is quite flexible, but it is possible to establish the presence of the duplex proximal to the triangle by X-ray crystallography. We modelled the transition between the red and blue states through a simple kinetic model.",
  },
  {
    Component: Dna_origami_object_80,
    name: "DNA-origami object",
    type: PROTEIN_TYPES.nanotech,
    PDBUrl: "https://www.rcsb.org/structure/4V5X",
    mass: 4692.02,
    // atomCount: 99723, // PDB
    radius: 212, // measured using PDB 3d viewer e.g. https://www.rcsb.org/3d-view/6CGR/1
    atomCount: 294953,
    numIcosahedronFaces: 10,
    numAsymmetricUnits: 1,
    pathToGLTF: "/models/nanotech/dna_origami_object_80.glb",
    pathToImage: "/models/nanotech/dna_origami_object.webp",
    interactive: true,
    pubmedAbstract:
      "A key goal for nanotechnology is to design synthetic objects that may ultimately achieve functionalities known today only from natural macromolecular complexes. Molecular self-assembly with DNA has shown potential for creating user-defined 3D scaffolds, but the level of attainable positional accuracy has been unclear. Here we report the cryo-EM structure and a full pseudoatomic model of a discrete DNA object that is almost twice the size of a prokaryotic ribosome. The structure provides a variety of stable, previously undescribed DNA topologies for future use in nanotechnology and experimental evidence that discrete 3D DNA scaffolds allow the positioning of user-defined structural motifs with an accuracy that is similar to that observed in natural macromolecules. Thereby, our results indicate an attractive route to fabricate nanoscale devices that achieve complex functionalities by DNA-templated design steered by structural feedback.",
  },
  {
    Component: Protein_cage_20,
    name: "16nm protein cage",
    type: PROTEIN_TYPES.nanotech,
    PDBUrl: "https://www.rcsb.org/structure/3VDX",
    mass: 150.79,
    atomCount: 10149,
    radius: 80,
    numIcosahedronFaces: 20,
    numAsymmetricUnits: 1,
    pathToGLTF: "/models/nanotech/protein_cage_20.glb",
    pathToImage: "/models/nanotech/protein_cage.webp",
    interactive: true,
    pubmedAbstract:
      "Designing protein molecules that will assemble into various kinds of ordered materials represents an important challenge in nanotechnology. We report the crystal structure of a 12-subunit protein cage that self-assembles by design to form a tetrahedral structure roughly 16 nanometers in diameter. The strategy of fusing together oligomeric protein domains can be generalized to produce other kinds of cages or extended materials.",
  },
  {
    Component: Octahedral_nanoparticle_20,
    name: "Octahedral nanoparticle",
    type: PROTEIN_TYPES.nanotech,
    PDBUrl: "https://www.rcsb.org/structure/6VFI",
    mass: 36.55,
    atomCount: 2437,
    radius: 100,
    numIcosahedronFaces: 8,
    numAsymmetricUnits: 1,
    pathToGLTF: "/models/nanotech/octahedral_nanoparticle_20.glb",
    pathToImage: "/models/nanotech/octahedral_nanoparticle.webp",
    interactive: true,
    pubmedAbstract:
      "Multivalent presentation of viral glycoproteins can substantially increase the elicitation of antigen-specific antibodies. To enable a new generation of anti-viral vaccines, we designed self-assembling protein nanoparticles with geometries tailored to present the ectodomains of influenza, HIV, and RSV viral glycoprotein trimers. We first de novo designed trimers tailored for antigen fusion, featuring N-terminal helices positioned to match the C termini of the viral glycoproteins. Trimers that experimentally adopted their designed configurations were incorporated as components of tetrahedral, octahedral, and icosahedral nanoparticles, which were characterized by cryo-electron microscopy and assessed for their ability to present viral glycoproteins. Electron microscopy and antibody binding experiments demonstrated that the designed nanoparticles presented antigenically intact prefusion HIV-1 Env, influenza hemagglutinin, and RSV F trimers in the predicted geometries. This work demonstrates that antigen-displaying protein nanoparticles can be designed from scratch, and provides a systematic way to investigate the influence of antigen presentation geometry on the immune response to vaccination.",
  },
  // {
  //   Component: Tetrahedral_nanoparticle_20,
  //   name: "Tetrahedral nanoparticle",
  //   type: PROTEIN_TYPES.nanotech,
  //   PDBUrl: "https://www.rcsb.org/structure/6VFH",
  //   mass: 45.55,
  //   atomCount: 3082,
  // radius: ,

  //   numIcosahedronFaces: 5,
  // numAsymmetricUnits   numIcosahedronFaces: 5,
  //   pathToGLTF: "/models/nanotech/tetrahedral_nanoparticle_20.glb",
  //   pathToImage: "/models/nanotech/tetrahedral_nanoparticle.webp",
  //   interactive: true,
  // },
  {
    Component: Icosahedral_nanoparticle_20,
    name: "Icosahedral nanoparticle",
    type: PROTEIN_TYPES.nanotech,
    PDBUrl: "https://www.rcsb.org/structure/6VFJ",
    mass: 32.57,
    atomCount: 2196,
    radius: 120,
    numIcosahedronFaces: 5,
    numAsymmetricUnits: 1,
    pathToGLTF: "/models/nanotech/icosahedral_nanoparticle_20.glb",
    pathToImage: "/models/nanotech/icosahedral_nanoparticle.webp",
    interactive: true,
    pubmedAbstract:
      "Multivalent presentation of viral glycoproteins can substantially increase the elicitation of antigen-specific antibodies. To enable a new generation of anti-viral vaccines, we designed self-assembling protein nanoparticles with geometries tailored to present the ectodomains of influenza, HIV, and RSV viral glycoprotein trimers. We first de novo designed trimers tailored for antigen fusion, featuring N-terminal helices positioned to match the C termini of the viral glycoproteins. Trimers that experimentally adopted their designed configurations were incorporated as components of tetrahedral, octahedral, and icosahedral nanoparticles, which were characterized by cryo-electron microscopy and assessed for their ability to present viral glycoproteins. Electron microscopy and antibody binding experiments demonstrated that the designed nanoparticles presented antigenically intact prefusion HIV-1 Env, influenza hemagglutinin, and RSV F trimers in the predicted geometries. This work demonstrates that antigen-displaying protein nanoparticles can be designed from scratch, and provides a systematic way to investigate the influence of antigen presentation geometry on the immune response to vaccination.",
  },
  // CELLS
  // CELLS
  // CELLS
  // CELLS
  // {
  //   Component: Lymphocyte,
  //   name: "Lymphocyte",
  //   type: PROTEIN_TYPES.cell,
  //   PDBUrl: "https://en.wikipedia.org/wiki/Lymphocyte",
  //   mass: 5000,
  //   atomCount: 5000,
  // radius: ,
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
  // radius: ,
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
  // radius: ,
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
  // radius: ,
  //   numIcosahedronFaces: 20,
  //   pathToGLTF: "/models/cells/cell_membrane.gltf",
  //   pathToImage: "/models/cells/cell_membrane.jpg",
  //   interactive: true,
  // },
];
