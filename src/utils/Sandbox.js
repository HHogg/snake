import { FN_TIMEOUT_SECONDS } from '../../functions/config';
import sandboxWorker from 'raw-loader!./sandboxWorker';

export default class Sandbox {
  constructor(onMessage, onError) {
    this.onMessage = onMessage;
    this.onError = onError;

    if (typeof Worker !== 'undefined') {
      this.createWorker();
    }
  }

  createWorker() {
    this.worker = new Worker(window.URL.createObjectURL(new Blob([sandboxWorker])));

    this.worker.onerror = (error) => {
      this.reset();
      this.onError(error);
    };

    this.worker.onmessage = ({ data }) => {
      this.reset();
      this.onMessage(data);
    };
  }

  run(args) {
    this.worker.postMessage(args);
    this.timeout = setTimeout(() => {
      this.worker.terminate();
      this.createWorker();
      this.onError({ message: '⏰ Your code exceeded the maximum ' +
        FN_TIMEOUT_SECONDS + ' seconds run time.' });
    }, FN_TIMEOUT_SECONDS * 1000);
  }

  reset() {
    clearTimeout(this.timeout);
  }
}
