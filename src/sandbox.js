onmessage = ({ data }) => {
  const { fn, args } = data;
  let findPath;
  let moves;

  try {
    findPath = eval(`(function() {
      ${fn};
      return findPath; })();
    `);

    moves = findPath.apply(undefined, args);
  } catch(error) {
    console.error(error);
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

