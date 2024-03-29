import React from "react";
import { useStore } from "../store";
import { useGLTF } from "../utils/useGltf";

const CELLS = [
  { Component: Lymphocyte },
  { Component: Monocyte },
  { Component: DendriticCell },
  { Component: Eosinophil },
  { Component: Basophil },
  { Component: Macrophages },
];
const SCALE = 0.2;
export default function Cells() {
  const worldRadius = useStore((s) => s.worldRadius);
  return (
    <>
      {CELLS.map(({ Component, ...rest }, idx) => {
        const position = [
          2 * (idx - (CELLS.length - 1) / 2),
          -Number(worldRadius) * 0.75,
          Number(worldRadius) * 0.75,
        ];
        return (
          <React.Fragment key={idx}>
            <Component
              position={position}
              scale={[SCALE, SCALE, SCALE]}
              {...rest}
            />
            <spotLight
              position={[position[0], position[1] + 2, position[2]]}
              angle={0.2}
              penumbra={0.5}
              intensity={0.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

/**
 * Dendritic cells are known as the most efficient antigen-presenting cell type with the ability to interact with T cells and initiate an immune response.  Dendritic cells are receiving increasing scientific and clinical interest due to their key role in the immune response and potential use with tumor vaccines.
 */
function DendriticCell(props) {
  return (
    <mesh {...props}>
      <sphereGeometry />
      <meshLambertMaterial color={props.color} />
    </mesh>
  );
}
/**
 * B lymphocytes produce antibodies - proteins (gamma globulins) that recognize foreign substances (antigen) and attach themselves to them.  B lymphocytes (or B cells) are each programmed to make one specific antibody.   When a B cell comes across its triggering antigen it gives rise to many large cells known as plasma cells.  Each plasma cell is essentially a factory for producing antibody.  An antibody matches an antigen much like a key matches a lock.  Whenever the antibody and antigen interlock, the antibody marks the antigen for destruction.  B lymphocytes are powerless to penetrate the cell so the job of attacking these target cells is left to T lymphocytes.
 *
 * T lymphocytes are cells that are programmed to recognize, respond to and remember antigens.  T lymphocytes (or T cells) contribute to the immune defenses in two major ways. Some direct and regulate the immune responses.  When stimulated by the antigenic material presented by the macrophages, the T cells make lymphokines that signal other cells.   Other T lymphocytes are able to destroy targeted cells on direct contact.
 */
function Lymphocyte(props) {
  const gltf = useGLTF("/models/cells/lymphocyte.glb");

  return <primitive object={gltf.scene} {...props} />;
}
/**
 * Monocyte: becomes a macrophage or a dendritic cell. Macrophages surround and kill microorganisms, ingest foreign material, remove dead cells, and boost immune responses. During inflammation, dendritic cells boost immune responses by showing antigens on their surface to other cells of the immune system.
 */
function Monocyte(props) {
  const gltf = useGLTF("/models/cells/monocyte.glb");
  return <primitive object={gltf.scene} {...props} />;
}
/**
 * Eosinophilic functions include: movement to inflamed areas, trapping substances, killing cells, anti-parasitic and bactericidal activity, participating in immediate allergic reactions, and modulating inflammatory responses.
 */
function Eosinophil(props) {
  const gltf = useGLTF("/models/cells/eosinophil.glb");
  return <primitive object={gltf.scene} {...props} />;
}
/**
 * Basophils appear in many specific kinds of inflammatory reactions, particularly those that cause allergic symptoms. Basophils contain anticoagulant heparin[citation needed], which prevents blood from clotting too quickly. They also contain the vasodilator histamine, which promotes blood flow to tissues.
 */
function Basophil(props) {
  const gltf = useGLTF("/models/cells/basophil.glb");
  return <primitive object={gltf.scene} {...props} />;
}
/**
 * http://chemocare.com/chemotherapy/what-is-chemotherapy/the-immune-system.aspx
 *
 * Macrophages are the body's first line of defense and have many roles.  A macrophage is the first cell to recognize and engulf foreign substances (antigens).  Macrophages break down these substances and present the smaller proteins to the T lymphocytes.  (T cells are programmed to recognize, respond to and remember antigens).  Macrophages also produce substances called cytokines that help to regulate the activity of lymphocytes.
 */
function Macrophages(props) {
  return (
    <mesh {...props}>
      <sphereGeometry />
      <meshLambertMaterial color={props.color} />
    </mesh>
  );
}
