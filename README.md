# Hey, welcome to my virus terrarium 🦠

I used [ChimeraX](https://www.rbvi.ucsf.edu/chimerax/download.html) to visualize virus capsid data from the [Protein DataBank (PDB)](https://www.rcsb.org/), and export .glb files

Then, I used [react-three-fiber](https://github.com/pmndrs/react-three-fiber) to render 3d components, [@react-three/cannon](https://github.com/pmndrs/use-cannon) to simulate physics, and [gltfjsx](https://github.com/pmndrs/gltfjsx) to turn .glb files into .jsx React components.

<a href="https://www.rcsb.org/structure/1KVP">
  <p align="middle">
      <div align="middle"><i>Spiroplasma SPV4</i></div>
      <div align="middle"><img width="360" src="./public/models/viruses/spiroplasma_SPV4_720.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/3J6R">
  <p align="middle">
      <div align="middle"><i>Human Papillomavirus (HPV)</i></div>
      <div align="middle"><img width="360" src="./public/models/viruses/hpv_720.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/6CGV">
  <p align="middle">
      <div align="middle"><i>Adenovirus</i></div>
      <div align="middle"><img width="360" src="./public/models/viruses/adenovirus_720.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/6LGN">
  <p align="middle">
      <div align="middle"><i>Chicken Pox (Varicella Zoster)</i></div>
      <div align="middle"><img width="360" src="./public/models/viruses/varicella_zoster.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/5J7V">
  <p align="middle">
      <div align="middle"><i>Faustovirus</i></div>
      <div align="middle"><img width="360" src="./public/models/viruses/faustovirus.webp" /></div>
  </p>
</a>
<a href="https://www.rcsb.org/structure/3J3Y">
  <p align="middle">
      <div align="middle"><i>HIV</i></div>
      <div align="middle"><img width="360" src="./public/models/viruses/hiv.webp" /></div>
  </p>
</a>
<p align="middle">
  <i>Click a virus to see it in the Protein DataBank!</i>
</p>

### Other tools:

- [react-three-gui](https://github.com/birkir/react-three-gui) - quick GUI controls for any variable
- [zustand](https://github.com/pmndrs/zustand) - simple global state managemer

### ChimeraX commands:

In ChimeraX, you can type commands in the terminal at the bottom.

- `color radial all palette Spectral-1` - colour all atoms radially, with the Spectral-1 [palette](https://www.rbvi.ucsf.edu/chimerax/docs/user/commands/color.html#palette-options)
- `surface all resolution 6` = [surface-render](https://www.rbvi.ucsf.edu/chimerax/docs/user/commands/surface.html) each atom with a sphere of radius 6 Angstroms (Å)
- `windowsize 640 640` - set viewport to 640 width and height

inspired by [BioVisions - Inner Life of the Cell | Protein Packing](https://www.youtube.com/watch?v=VdmbpAo9JR4)
