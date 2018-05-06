import { themes } from 'preshape';

const hexToRgb = (hex, int = parseInt(hex.replace('#', ''), 16)) =>
  [(int >> 16) & 255, (int >> 8) & 255, int & 255];

const themeGradients = Object.keys(themes).reduce((theme, key) => ({
  ...theme,
  [key]: [
    [0.0, hexToRgb(themes[key].colorAccentShade2)],
    [1.0, hexToRgb(themes[key].colorTextShade2)],
  ],
}), {});


export default (theme, percent) => {
  const GRADIENT = themeGradients[theme];
  const [lp, [lr, lg, lb]] = GRADIENT[0];
  const [up, [ur, ug, ub]] = GRADIENT[1];
  const upperPercentage = (percent - lp) / (up - lp);
  const lowerPercentage = 1 - upperPercentage;

  return `rgb(
    ${Math.floor(lr * lowerPercentage + ur * upperPercentage)},
    ${Math.floor(lg * lowerPercentage + ug * upperPercentage)},
    ${Math.floor(lb * lowerPercentage + ub * upperPercentage)}
  )`;
};
