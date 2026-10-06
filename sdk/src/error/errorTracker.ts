export function initErrorTracker(onEvent: (type: string, data: any) => void) {
  window.addEventListener('error', (event) => {
    onEvent('JS_ERROR', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      stack: event.error?.stack,
    });
  });
}