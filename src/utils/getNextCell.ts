import { getRandomArrayValue } from "./getRandomArrayValue"

const VECTOR = [-1, 0, 1]

const getRandomVectorValue = () => getRandomArrayValue(VECTOR);

const normalizeValue = (value: number, bounding: number) => {
  const newValue = value % (bounding - 1);
  return newValue < 0 ? bounding - 1 : newValue;
}

export const getNextCell = (
  x: number,
  y: number,
  nextX: number,
  nextY: number,
  width = 40,
  height = 20,
) => {
  const newX = normalizeValue(x + nextX, width);
  const newY = normalizeValue(y + nextY, height);
  return [newX, newY];
}

export const getRandomNextCell = (x: number, y: number, width = 40, height = 20) =>
  getNextCell(x, y, getRandomVectorValue(), getRandomVectorValue(), width, height);