export default (ns: number[]) => ns.length
  ? ns.reduce((acc, n) => acc + n, 0) / ns.length
  : 0;
