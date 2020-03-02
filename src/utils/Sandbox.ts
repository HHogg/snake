import { Point, Snake, Values } from '../Types';
import { FN_TIMEOUT_SECONDS } from '../config';

interface MessageData {
  isRunning: boolean;
  values: Values;
}

interface RunData {
  env: {
    point: Point;
    snake: Snake;
    xMax: number;
    yMax: number;
  };
  fn: string;
}

type ErrorHandler = (error: Error | ErrorEvent) => void;
type MessageHandler = (data: MessageData) => void;

export default class Sandbox {
  onError?: ErrorHandler;
  onMessage?: MessageHandler;
  timeout?: NodeJS.Timeout;
  worker?: Worker;

  constructor() {
    if (typeof Worker !== 'undefined') {
      this.createWorker();
    }
  }

  createWorker() {
    this.worker = new Worker('./SandboxWorker.js');

    this.worker.onerror = (error) => {
      this.reset();

      if (this.onError) {
        this.onError(error);
      }
    };

    this.worker.onmessage = ({ data }: { data: MessageData }) => {
      this.reset();

      if (this.onMessage) {
        this.onMessage(data);
      }
    };
  }

  run(args: RunData) {
    if (!this.timeout) {
      this.worker?.postMessage(args);
      this.timeout = setTimeout(() => {
        const error = new Error('Timeout');
        error.message = `⏰ Your code exceeded the maximum ${FN_TIMEOUT_SECONDS} seconds run time.`;
        this.worker?.terminate();
        this.createWorker();

        if (this.onError) {
          this.onError(error);
        }
      }, FN_TIMEOUT_SECONDS * 1000);
    }
  }

  reset() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      delete this.timeout;
    }
  }
}
