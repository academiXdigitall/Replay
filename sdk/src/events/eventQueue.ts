export class EventQueue {
  private queue: any[] = [];
  private endpoint: string;
  private apiKey: string;

  constructor(endpoint: string, apiKey: string) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
    this.startFlushLoop();
  }

  public push(event: any) {
    this.queue.push(event);
  }

  private startFlushLoop() {
    setInterval(() => {
      if (this.queue.length === 0) return;
      const batch = this.queue.splice(0, this.queue.length);
      navigator.sendBeacon(
        `${this.endpoint}/api/events`,
        JSON.stringify({ apiKey: this.apiKey, events: batch })
      );
    }, 3000);
  }
}