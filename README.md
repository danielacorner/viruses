# Hey, welcome to my virus terrarium 🦠

I used [ChimeraX](https://www.rbvi.ucsf.edu/chimerax/download.html) to visualize virus capsid data from the [Protein DataBank (PDB)](https://www.rcsb.org/)

Then, I used [react-three-fiber](https://github.com/pmndrs/react-three-fiber) and [@react-three/cannon](https://github.com/pmndrs/use-cannon) to render and simulate physical interactions.

Molecule mass and size data sourced from PDB.

<a href="https://www.rcsb.org/structure/1KVP">
  <p align="middle">
      <div align="middle"><i>Spiroplasma SPV4</i> <small>(497 atoms)</small></div>
      <div align="middle"><img width="360" src="./public/models/viruses/Spiroplasma_SPV4.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/3J6R">
  <p align="middle">
      <div align="middle"><i>Human Papillomavirus (HPV)</i> <small>(11,466 atoms)</small></div>
      <div align="middle"><img width="360" src="./public/models/viruses/hpv.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/6CGV">
  <p align="middle">
      <div align="middle"><i>Adenovirus</i> <small>(99,723 atoms)</small></div>
      <div align="middle"><img width="360" src="./public/models/viruses/adenovirus.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/6LGN">
  <p align="middle">
      <div align="middle"><i>Chicken Pox (Varicella Zoster)</i> <small>(208,346 atoms)</small></div>
      <div align="middle"><img width="360" src="./public/models/viruses/varicella_zoster.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/3J3Y">
  <p align="middle">
      <div align="middle"><i>HIV</i> <small>(2,116,800 atoms)</small></div>
      <div align="middle"><img width="360" src="./public/models/viruses/hiv.webp" /></div>
  </p>
</a>
<p align="middle">
  <i>Click a virus to see it in the Protein DataBank!</i>
</p>


### Other tools:

- [gltfjsx](https://github.com/pmndrs/gltfjsx) - transform .gltf or .glb files into .jsx React components
- [react-three-gui](https://github.com/birkir/react-three-gui) - quick GUI controls for any variable
- [zustand](https://github.com/pmndrs/zustand) - simple global state managemer

### ChimeraX commands:

In ChimeraX, you can type commands in the terminal at the bottom.

`color radial all palette Spectral-1` - colour all atoms radially, with the Spectral-1 [palette](https://www.rbvi.ucsf.edu/chimerax/docs/user/commands/color.html#palette-options)
`surface all resolution 6` = [surface-render](https://www.rbvi.ucsf.edu/chimerax/docs/user/commands/surface.html) each atom with a sphere of radius 6 Angstroms (Å)
`windowsize 640 640` - set viewport to 640 width and height
