export function initNetworkInterceptor(onEvent: (type: string, data: any) => void) {
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const [url, options] = args;
    const startTime = performance.now();
    try {
      const response = await originalFetch(...args);
      const duration = performance.now() - startTime;
      onEvent('API_REQUEST', {
        url,
        method: options?.method || 'GET',
        status: response.status,
        duration,
      });
      return response;
    } catch (error: any) {
      onEvent('API_ERROR', {
        url,
        method: options?.method || 'GET',
        error: error.message,
      });
      throw error;
    }
  };
}