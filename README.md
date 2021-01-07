# Hey, welcome to my virus terrarium.

### I used [ChimeraX](https://www.rbvi.ucsf.edu/chimerax/download.html) to visualize virus capsid data from the [Protein DataBank (PDB)](https://www.rcsb.org/)

##### [*Spiroplasma SPV4*](https://www.rcsb.org/structure/1KVP):

###### (497 atoms)

![Spiroplasma SPV4](./public/models/viruses/Spiroplasma_SPV4.webp)



##### [*Human Papillomavirus (HPV)*](https://www.rcsb.org/structure/3J6R):

###### (11,466 atoms)

![HPV](./public/models/viruses/hpv.webp)



##### [*Adenovirus*](https://www.rcsb.org/structure/6CGV):

###### (99,723 atoms)

![Adenovirus](./public/models/viruses/adenovirus.webp)



##### [*Chicken Pox (Varicella Zoster)*](https://www.rcsb.org/structure/6LGN):

###### (208,346 atoms)

![Chicken Pox](./public/models/viruses/varicella_zoster.webp)



##### [*HIV*](https://www.rcsb.org/structure/3J3Y):

###### (2,116,800 atoms)

![HIV](./public/models/viruses/hiv.webp)



### Then, I used [react-three-fiber](https://github.com/pmndrs/react-three-fiber) and [@react-three/cannon](https://github.com/pmndrs/use-cannon) to rander and simulate physical interactions.

molecule mass and size data sourced from PDB.

### Other tools:

- [gltfjsx](https://github.com/pmndrs/gltfjsx) - transform .gltf or .glb files into .jsx React components
- [react-three-gui](https://github.com/birkir/react-three-gui) - quick GUI controls for any variable
- [zustand](https://github.com/pmndrs/zustand) - simple global state managemer

### ChimeraX commands:

In ChimeraX, you can type commands in the terminal at the bottom.

`color radial all palette Spectral-1` - colour all atoms radially, with the Spectral-1 [palette](https://www.rbvi.ucsf.edu/chimerax/docs/user/commands/color.html#palette-options)
`surface all resolution 6` = [surface-render](https://www.rbvi.ucsf.edu/chimerax/docs/user/commands/surface.html) each atom with a sphere of radius 6 Angstroms (Å)
`windowsize 640 640` - set viewport to 640 width and height