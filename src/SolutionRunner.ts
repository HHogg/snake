import { TypePoint, TypeSnake, TypeValues } from './Types';

interface Config {
  timeout: number;
  worker: Worker;
}

interface MessageData {
  values: TypeValues;
}

interface RunData {
  env: {
    point: TypePoint;
    snake: TypeSnake;
    xMax: number;
    yMax: number;
  };
  fn: string;
}

type ErrorHandler = (error: Error | ErrorEvent) => void;
type MessageHandler = (data: MessageData) => void;

export default class SolutionRunner {
  config: Config;
  onError?: ErrorHandler;
  onMessage?: MessageHandler;
  timeout?: NodeJS.Timeout;
  worker: Worker;

  constructor(config: Config) {
    this.config = config;
    this.worker = config.worker;

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
      this.worker.postMessage(args);
      this.timeout = setTimeout(() => {
        const error = new Error('Timeout');
        error.message = `⏰ Your code exceeded the maximum ${this.config.timeout} ms run time.`;

        if (this.onError) {
          this.onError(error);
        }
      }, this.config.timeout);
    }
  }

  reset() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      delete this.timeout;
    }
  }

  destroy() {
    this.reset();
    this.worker.terminate();
  }
}
