module.exports = function runInSandbox(workerBlob, args, timeoutSeconds = 10) {
  return new Promise((resolve, reject) => {
    const sandbox = new Worker(window.URL.createObjectURL(new Blob([workerBlob])));
    const sandboxTimeout = setTimeout(() => reject({ error: 'timeout' }), timeoutSeconds * 1000);

    sandbox.onerror = (error) => {
      clearTimeout(sandboxTimeout);
      sandbox.terminate();
      reject(error);
    };

    sandbox.onmessage = ({ data }) => {
      clearTimeout(sandboxTimeout);
      sandbox.terminate();
      resolve(data);
    };

    sandbox.postMessage(args);
  });
};
