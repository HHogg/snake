onmessage = ({ data }) => {
  const { fn, args } = data;
  let findPath;
  let moves;

  try {
    findPath = eval(`(function() {
      console.log = function() {
        postMessage({
          action: 'log',
          args: Array.prototype.map.call(arguments, (a) => a),
        });
      };

      ${fn};
      return findPath; })();
    `);

    moves = findPath.apply(undefined, args);
  } catch(error) {
    postMessage({
      action: 'error',
      error: error.message,
    });
  }

  postMessage({
    action: 'moves',
    moves,
  });
};

