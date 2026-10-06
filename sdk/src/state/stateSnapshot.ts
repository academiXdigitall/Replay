export function captureStateSnapshot(): Record<string, any> {
  return {
    url: window.location.href,
    viewport: { width: window.innerWidth, height: window.innerHeight },
    localStorageKeys: Object.keys(localStorage),
  };
}