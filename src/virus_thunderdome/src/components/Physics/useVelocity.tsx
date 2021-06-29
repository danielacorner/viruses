import { useStore } from "../../store";

const VELOCITY_COEFF = 15;

export function useVelocity(mass: any) {
  const temperature = useStore((state) => state.temperature);
  // based on the temperature, we can determine the velocity change
  // https://courses.lumenlearning.com/boundless-chemistry/chapter/kinetic-molecular-theory/#:~:text=It%20is%20represented%20by%20the,is%20the%20temperature%20in%20Kelvin.
  // v =~ sqrt( temperature / mass )
  const velocity = VELOCITY_COEFF * (temperature / mass) ** 0.5;
  return { temperature, velocity };
}
