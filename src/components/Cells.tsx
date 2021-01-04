import React from "react";
import niceColors from "nice-color-palettes";
import { useStore } from "../store";

const CELLS = [
  { Component: BLymphocyte, color: niceColors[17][0] },
  { Component: TLymphocyte, color: niceColors[17][1] },
  { Component: DendriticCell, color: niceColors[17][2] },
  { Component: Eosinophil, color: niceColors[17][3] },
  { Component: Macrophages, color: niceColors[17][4] },
];

export default function Cells() {
  const worldRadius = useStore(({ worldRadius }) => worldRadius);

  return (
    <>
      {CELLS.map(({ Component, ...rest }, idx) => (
        <Component
          key={idx}
          position={[
            2 * (idx - (CELLS.length - 1) / 2),
            -worldRadius * 0.75,
            worldRadius * 0.75,
          ]}
          {...rest}
        />
      ))}
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
 */
function BLymphocyte(props) {
  return (
    <mesh {...props}>
      <sphereGeometry />
      <meshLambertMaterial color={props.color} />
    </mesh>
  );
}
/**
 * T lymphocytes are cells that are programmed to recognize, respond to and remember antigens.  T lymphocytes (or T cells) contribute to the immune defenses in two major ways. Some direct and regulate the immune responses.  When stimulated by the antigenic material presented by the macrophages, the T cells make lymphokines that signal other cells.   Other T lymphocytes are able to destroy targeted cells on direct contact.
 */
function TLymphocyte(props) {
  return (
    <mesh {...props}>
      <sphereGeometry />
      <meshLambertMaterial color={props.color} />
    </mesh>
  );
}
function Eosinophil(props) {
  return (
    <mesh {...props}>
      <sphereGeometry />
      <meshLambertMaterial color={props.color} />
    </mesh>
  );
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
