# Hey, welcome to my virus terrarium.

### I used [ChimeraX](https://www.rbvi.ucsf.edu/chimerax/download.html) to visualize virus data from the [Protein DataBank (PDB)](https://www.rcsb.org/)

Here's a [*Spiroplasma SPV4*](https://www.rcsb.org/structure/1KVP):

![Spiroplasma SPV4](./public/models/viruses/Spiroplasma_SPV4_360.gif)

### Then, I used [react-three-fiber](https://github.com/pmndrs/react-three-fiber) to render them, and [@react-three/cannon](https://github.com/pmndrs/use-cannon) to simulate physical interactions, using mass and size data from PDB.

### Other tools:

- [gltfjsx](https://github.com/pmndrs/gltfjsx) - transform .gltf or .glb files into .jsx React components
- [react-three-gui](https://github.com/birkir/react-three-gui) - quick GUI controls for any variable
- [zustand](https://github.com/pmndrs/zustand) - simple global state managemer