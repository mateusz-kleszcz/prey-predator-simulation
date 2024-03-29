import { getPlant, getPredator, getPrey } from "./constructors";
import { Cell, CellType } from "./types";

export type BoardType = Cell[][];

type BoardMap = Map<string, [number, number]>;

export const getEmptyCellsMap = (board: BoardType): BoardMap => {
  const cells = board.map((rows, y) => rows.map((_, x) => [x, y])).flat();
  return new Map(cells.map(([x, y]) => [`${x}-${y}`, [x, y]]));
};

export const getRandomCell = (emptyCellsMap: BoardMap) => {
  const values = Array.from(emptyCellsMap.values());
  return values[Math.floor(Math.random() * values.length)];
};

export const generateBoard = (
  width = 40,
  height = 20,
  startingNumberOfPreys = 0.1,
  startingNumberOfPredators = 0.02,
  startingNumberOfPlantsRemaining = 0.02,
  initialPreyEscape = 0.2,
  initialPredatorEffectiveness = 0.6,
  initialPreyEnergy = 100,
  initialPredatorEnergy = 100,
  initialPreyReproductionCooldown = 1,
  initialPredatorReproductionCooldown = 1
) => {
  const board = Array.from(Array(height), () =>
    Array(width).fill({ type: CellType.Empty })
  );
  const emptyCellsMap = getEmptyCellsMap(board);
  const preys = [];
  const predators = [];
  const preysNumber = Math.floor(width * height * startingNumberOfPreys);
  const predatorsNumber = Math.floor(
    width * height * startingNumberOfPredators
  );

  for (let i = 0; i < preysNumber; i++) {
    const [x, y] = getRandomCell(emptyCellsMap);
    board[y][x] = getPrey(
      initialPreyEscape,
      initialPreyEnergy,
      initialPreyReproductionCooldown
    );
    preys.push([x, y]);
    emptyCellsMap.delete(`${x}-${y}`);
  }

  for (let i = 0; i < predatorsNumber; i++) {
    const [x, y] = getRandomCell(emptyCellsMap);
    board[y][x] = getPredator(
      initialPredatorEffectiveness,
      initialPredatorEnergy,
      initialPredatorReproductionCooldown
    );
    predators.push([x, y]);
    emptyCellsMap.delete(`${x}-${y}`);
  }

  const plantsNumber = Math.floor(
    emptyCellsMap.size * startingNumberOfPlantsRemaining
  );
  for (let i = 0; i < plantsNumber; i++) {
    const [x, y] = getRandomCell(emptyCellsMap);
    board[y][x] = getPlant();
    emptyCellsMap.delete(`${x}-${y}`);
  }

  return [board, preys, predators];
};
