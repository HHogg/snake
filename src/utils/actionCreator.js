
export default (type) => (...args) =>
  args.length
    ? { type, payload: args[0] }
    : { type };
