const GRADIENT = [
  [0.0, [255, 224, 102] ],
  [0.5, [192, 235, 117] ],
  [1.0, [102, 217, 232] ],
];

export default (percent) => {
  const upperIndex = GRADIENT.findIndex(([p]) => p > percent);
  const [lp, [lr, lg, lb]] = GRADIENT[upperIndex - 1];
  const [up, [ur, ug, ub]] = GRADIENT[upperIndex];
  const upperPercentage = (percent - lp) / (up - lp);
  const lowerPercentage = 1 - upperPercentage;

  return `rgb(
    ${Math.floor(lr * lowerPercentage + ur * upperPercentage)},
    ${Math.floor(lg * lowerPercentage + ug * upperPercentage)},
    ${Math.floor(lb * lowerPercentage + ub * upperPercentage)}
  )`;
};
