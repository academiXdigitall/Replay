export function initClickTracker(onEvent: (type: string, data: any) => void) {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    onEvent('DOM_CLICK', {
      tagName: target.tagName,
      id: target.id,
      className: target.className,
      text: target.innerText?.slice(0, 30),
    });
  });
}