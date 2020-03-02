import { themes, TypeTheme } from 'preshape';

const hexToRgb = (hex: string, int = parseInt(hex.replace('#', ''), 16)): [number, number, number] =>
  [(int >> 16) & 255, (int >> 8) & 255, int & 255];

const themeGradients = (Object.keys(themes) as TypeTheme[])
  .reduce<{ [key in TypeTheme]?: [number, [number, number, number]][] }>((theme, key) => ({
    ...theme,
    [key]: [
      [0, hexToRgb(themes[key].colorAccentShade2)],
      [1, hexToRgb(themes[key].colorTextShade2)],
    ],
  }), {});


export default (theme: TypeTheme, percent: number) => {
  const GRADIENT = themeGradients[theme];

  if (GRADIENT) {
    const [lp, [lr, lg, lb]] = GRADIENT[0];
    const [up, [ur, ug, ub]] = GRADIENT[1];
    const upperPercentage = (percent - lp) / (up - lp);
    const lowerPercentage = 1 - upperPercentage;

    return `rgb(
      ${Math.floor(lr * lowerPercentage + ur * upperPercentage)},
      ${Math.floor(lg * lowerPercentage + ug * upperPercentage)},
      ${Math.floor(lb * lowerPercentage + ub * upperPercentage)}
    )`;
  }

  return '';
};
