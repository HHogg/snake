import { Cell } from '../Types';
import { CANVAS_SIZE } from '../config';

export default ([x, y]: Cell) => x >= 0 && x < CANVAS_SIZE && y >= 0 && y < CANVAS_SIZE;
