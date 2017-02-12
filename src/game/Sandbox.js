const { FN_TIMEOUT } = require('../config');
const sandboxWorker = require('raw-loader!./sandbox-worker.js');

class Sandbox {
  constructor(onMessage, onError) {
    this.worker = new Worker(window.URL.createObjectURL(new Blob([sandboxWorker])));
    this.onError = onError;
    this.onMessage = onMessage;

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
      this.onError({ message: `⏰ Your code exceeded the maximum ${FN_TIMEOUT} seconds run time.` });
    }, FN_TIMEOUT * 1000);
  }

  reset() {
    clearTimeout(this.timeout);
  }
}

module.exports = Sandbox;
