import getSurroundingCells from './getSurroundingCells';

const xMax = 10;
const yMax = 10;

describe('common: getSurroundingCells', () => {
  test('snake is in top left corner', () => {
    expect(getSurroundingCells([[0, 0]], xMax, yMax)).toEqual([
      [1, 0],
      [0, 1],
    ]);
  });

  test('snake is in top right corner', () => {
    expect(getSurroundingCells([[xMax - 1, 0]], xMax, yMax)).toEqual([
      [xMax - 1, 1],
      [xMax - 2, 0],
    ]);
  });

  test('snake is in bottom right corner', () => {
    expect(getSurroundingCells([[xMax - 1, yMax - 1]], xMax, yMax)).toEqual([
      [xMax - 1, yMax - 2],
      [xMax - 2, yMax - 1],
    ]);
  });

  test('snake is in bottom left corner', () => {
    expect(getSurroundingCells([[0, yMax - 1]], xMax, yMax)).toEqual([
      [0, yMax - 2],
      [1, yMax - 1],
    ]);
  });

  test('snake is not in a corner', () => {
    expect(getSurroundingCells([[5, 5]], xMax, yMax)).toEqual([
      [5, 4],
      [6, 5],
      [5, 6],
      [4, 5],
    ]);
  });
});
