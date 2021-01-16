// https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
export function getIsTouchDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
