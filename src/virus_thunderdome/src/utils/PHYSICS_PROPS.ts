export const PHYSICS_PROPS = {
  defaultContactMaterial: {
    friction: 0.0,
    restitution: 1.0,
    contactEquationStiffness: 1e7,
    contactEquationRelaxation: 1,
    frictionEquationStiffness: 1e7,
    frictionEquationRelaxation: 2,
  },
  gravity: [0, 0, 0],
  step: 1 / 60, // simulation speed
};
