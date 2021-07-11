import { useGLTF as useGLTFdrei } from "@react-three/drei";
// export const useGLTF = (url) =>
//   useGLTFdrei(
//     url
//     // "https://www.gstatic.com/draco/v1/decoders/draco_decoder_gltf.wasm"
//   );
// export const useGLTF = (url) => useGLTFdrei(url);
export const useGLTF = (url) => useGLTFdrei(url, "/draco-gltf/");
