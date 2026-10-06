import { EventQueue } from './events/eventQueue';
import { initClickTracker } from './tracker/clickTracker';
import { initErrorTracker } from './errors/errorTracker';
import { initNetworkInterceptor } from './network/networkInterceptor';
import { captureStateSnapshot } from './state/stateSnapshot';

export interface ReplayOptions {
  apiKey: string;
  endpoint: string;
  appId: string;
}

export class ReplaySDK {
  private appId: string;
  private sessionId: string;
  private sequenceNum: number = 0;
  private queue: EventQueue;

  constructor(options: ReplayOptions) {
    this.appId = options.appId;
    this.sessionId = crypto.randomUUID();
    this.queue = new EventQueue(options.endpoint, options.apiKey);

    this.track('SESSION_START', captureStateSnapshot());

    initClickTracker((type, data) => this.track(type, data));
    initErrorTracker((type, data) => this.track(type, data));
    initNetworkInterceptor((type, data) => this.track(type, data));
  }

  public track(type: string, payload: Record<string, any> = {}) {
    this.queue.push({
      sessionId: this.sessionId,
      appId: this.appId,
      type,
      payload,
      timestamp: new Date().toISOString(),
      sequenceNum: ++this.sequenceNum,
    });
  }
}