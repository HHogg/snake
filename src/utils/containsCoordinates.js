
export default (set, [x, y]) =>
  set.some(([sx, sy]) => x === sx && y === sy);
