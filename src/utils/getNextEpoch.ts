import { dispatch } from "../store/chartDataStore";
import { getEmptyCell, getPlant, getPredator, getPrey } from "./constructors";
import { BoardType, getEmptyCellsMap, getRandomCell } from "./generateBoard";
import { getNextCell, getRandomNextCell } from "./getNextCell";
import { getRandomArrayValue } from "./getRandomArrayValue";
import { CellType, Predator, Prey } from "./types";

const VECTOR = [-1, 0, 1];

const isEmptySpaceAround = (
  board: BoardType,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => {
  const width = board[0].length;
  const height = board.length;
  const neighbours1 = VECTOR.map((i) =>
    VECTOR.map((j) => getNextCell(x1, y1, i, j, width, height))
  ).flat();
  const neighbours2 = VECTOR.map((i) =>
    VECTOR.map((j) => getNextCell(x2, y2, i, j, width, height))
  ).flat();

  const emptyNeighbours = [...neighbours1, ...neighbours2].filter(
    ([x, y]) =>
      board[y][x].type === CellType.Empty || board[y][x].type === CellType.Plant
  );
  const uniqueEmptyNeighbours = [...new Set(emptyNeighbours)];
  return getRandomArrayValue(uniqueEmptyNeighbours);
};

export const getNextEpoch = (
  board: BoardType,
  preys: number[][],
  predators: number[][],
  energyPreyLostWalking = 10,
  energyPredatorLostWalking = 5,
  energyPreyLostReproducting = 30,
  energyPredatorLostReproducting = 20,
  energyPreyFromEating = 50,
  energyPredatorFromEating = 80,
  chanceOfReproductionPrey = 0.15,
  chanceOfReproductionPredator = 0.8,
  preyReproductionCooldown = 4,
  predatorReproductionCooldown = 4,
  numberOfPlantsRemaining = 0.02,
  escapePreyConstant = 0.01,
  effectivenessPredatorConstant = 0.03
) => {
  const height = board.length;
  const width = board[0].length;
  const newPreys = [];
  const newPredators = [];
  const emptyCellsMap = getEmptyCellsMap(board);

  for (let prey of preys) {
    const [x, y] = prey;
    const preyObject = board[y][x] as Prey;
    const newPreyObject = {
      ...preyObject,
      energy: preyObject.energy - energyPreyLostWalking,
      reproductionCooldown: Math.max(preyObject.reproductionCooldown - 1, 0),
    };
    if (newPreyObject.energy <= 0) {
      board[y][x] = getEmptyCell();
      continue;
    }
    const [newX, newY] = getRandomNextCell(x, y, width, height);
    const nextCellObject = { ...board[newY][newX] };
    if (newX === x && newY === y) {
      board[y][x] = newPreyObject;
      newPreys.push([x, y]);
      emptyCellsMap.delete(`${x}-${y}`);
      continue;
    }
    if (nextCellObject.type === CellType.Empty) {
      board[newY][newX] = newPreyObject;
      board[y][x] = getEmptyCell();
      newPreys.push([newX, newY]);
      emptyCellsMap.delete(`${newX}-${newY}`);
      continue;
    }
    if (nextCellObject.type === CellType.Plant) {
      newPreyObject.energy += energyPreyFromEating;
      if (newPreyObject.energy > 100) {
        newPreyObject.energy = 100;
      }
      board[newY][newX] = newPreyObject;
      board[y][x] = getEmptyCell();
      newPreys.push([newX, newY]);
      emptyCellsMap.delete(`${newX}-${newY}`);
      continue;
    }
    if (nextCellObject.type === CellType.Prey) {
      board[y][x] = newPreyObject;
      newPreys.push([x, y]);
      emptyCellsMap.delete(`${x}-${y}`);
      const newPreyCords = isEmptySpaceAround(board, x, y, newX, newY);
      if (
        newPreyObject.reproductionCooldown !== 0 ||
        nextCellObject.reproductionCooldown !== 0 ||
        newPreyObject.energy <= energyPreyLostReproducting ||
        nextCellObject.energy <= energyPreyLostReproducting ||
        Math.random() > chanceOfReproductionPrey ||
        !newPreyCords
      ) {
        continue;
      }

      newPreyObject.energy -= energyPreyLostReproducting;
      nextCellObject.energy -= energyPreyLostReproducting;
      newPreyObject.reproductionCooldown = preyReproductionCooldown;
      nextCellObject.reproductionCooldown = preyReproductionCooldown;

      const newPreyEscape =
        (newPreyObject.escape + nextCellObject.escape) / 2 + escapePreyConstant;
      const newPreyEnergy = Math.min(
        Math.floor((newPreyObject.energy + nextCellObject.energy) / 2),
        100
      );

      const [newPreyX, newPreyY] = newPreyCords;
      board[newPreyY][newPreyX] = getPrey(
        newPreyEscape,
        newPreyEnergy,
        predatorReproductionCooldown
      );
      newPreys.push([newPreyX, newPreyY]);
      emptyCellsMap.delete(`${newPreyX}-${newPreyY}`);
      continue;
    }
    if (nextCellObject.type === CellType.Predator) {
      board[y][x] = newPreyObject;
      newPreys.push([x, y]);
      emptyCellsMap.delete(`${x}-${y}`);
      continue;
    }
  }

  for (let predator of predators) {
    const [x, y] = predator;
    const predatorObject = board[y][x] as Predator;
    const newPredatorObject = {
      ...predatorObject,
      energy: predatorObject.energy - energyPredatorLostWalking,
      reproductionCooldown: Math.max(
        predatorObject.reproductionCooldown - 1,
        0
      ),
    };
    if (newPredatorObject.energy <= 0) {
      board[y][x] = getEmptyCell();
      continue;
    }
    const [newX, newY] = getRandomNextCell(x, y, width, height);
    const nextCellObject = { ...board[newY][newX] };
    if (newX === x && newY === y) {
      board[newY][newX] = newPredatorObject;
      newPredators.push([newX, newY]);
      emptyCellsMap.delete(`${newX}-${newY}`);
      continue;
    }
    if (
      nextCellObject.type === CellType.Empty ||
      nextCellObject.type === CellType.Plant
    ) {
      board[newY][newX] = newPredatorObject;
      board[y][x] = getEmptyCell();
      newPredators.push([newX, newY]);
      emptyCellsMap.delete(`${newX}-${newY}`);
      continue;
    }
    if (nextCellObject.type === CellType.Predator) {
      board[y][x] = newPredatorObject;
      newPredators.push([x, y]);
      emptyCellsMap.delete(`${x}-${y}`);
      const newPredatorsCords = isEmptySpaceAround(board, x, y, newX, newY);
      if (
        newPredatorObject.reproductionCooldown !== 0 ||
        nextCellObject.reproductionCooldown !== 0 ||
        newPredatorObject.energy <= energyPredatorLostReproducting ||
        nextCellObject.energy <= energyPredatorLostReproducting ||
        Math.random() > chanceOfReproductionPredator ||
        !newPredatorsCords
      ) {
        continue;
      }

      newPredatorObject.energy -= energyPredatorLostReproducting;
      nextCellObject.energy -= energyPredatorLostReproducting;
      newPredatorObject.reproductionCooldown = predatorReproductionCooldown;
      nextCellObject.reproductionCooldown = predatorReproductionCooldown;

      const newPredatorEffectivenes =
        (newPredatorObject.effectiveness + nextCellObject.effectiveness) / 2 +
        effectivenessPredatorConstant;
      const newPredatorEnergy = Math.min(
        Math.floor((newPredatorObject.energy + nextCellObject.energy) / 2),
        100
      );
      const [newPredatorX, newPredatorY] = newPredatorsCords;
      board[newPredatorY][newPredatorX] = getPredator(
        newPredatorEffectivenes,
        newPredatorEnergy,
        predatorReproductionCooldown
      );
      newPredators.push([newPredatorX, newPredatorY]);
      emptyCellsMap.delete(`${newPredatorX}-${newPredatorY}`);
      continue;
    }
    if (nextCellObject.type === CellType.Prey) {
      if (
        Math.random() >
        newPredatorObject.effectiveness - nextCellObject.escape
      ) {
        const escapePreyIndex = newPreys.findIndex(
          (prey) => prey[0] === newX && prey[1] === newY
        );
        newPreys.splice(escapePreyIndex, 1);

        board[y][x] = nextCellObject;
        newPreys.push([x, y]);
        emptyCellsMap.delete(`${x}-${y}`);
        board[newY][newX] = newPredatorObject;
        newPredators.push([newX, newY]);
        emptyCellsMap.delete(`${newX}-${newY}`);
        continue;
      }
      newPredatorObject.energy += energyPredatorFromEating;
      if (newPredatorObject.energy > 100) {
        newPredatorObject.energy = 100;
      }
      board[newY][newX] = newPredatorObject;
      board[y][x] = getEmptyCell();
      newPredators.push([newX, newY]);
      emptyCellsMap.delete(`${newX}-${newY}`);
      const eatenPreyIndex = newPreys.findIndex(
        (prey) => prey[0] === newX && prey[1] === newY
      );
      newPreys.splice(eatenPreyIndex, 1);
      continue;
    }
  }

  const emptyFields = emptyCellsMap.size;
  const numberOfNewPlants = emptyFields * numberOfPlantsRemaining;
  for (let i = 0; i < numberOfNewPlants; i++) {
    const [x, y] = getRandomCell(emptyCellsMap);

    if (board[y][x].type === CellType.Empty) {
      board[y][x] = getPlant();
    }
  }

  dispatch({
    type: "add",
    value: { predators: newPredators.length, preys: newPreys.length },
  });

  return [board, newPreys, newPredators];
};
