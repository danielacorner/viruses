import { useRef } from "react";
import useComponentSize, { ComponentSize } from "@rehooks/component-size";

const useContainerDimensions = () => {
  const ref = useRef();
  const size = useComponentSize(ref);

  return [ref, size] as [React.MutableRefObject<any>, ComponentSize];
};

export default useContainerDimensions;
