import { Cell, CellType, Plant, Predator, Prey } from "./types";

export const getEmptyCell = (): Cell => ({ type: CellType.Empty });

export const getPrey = (
  initialPreyEscape = 0.1,
  initialPreyEnergy = 100,
  initialReproductionCooldown = 0
): Prey => ({
  type: CellType.Prey,
  energy: initialPreyEnergy,
  escape: initialPreyEscape,
  reproductionCooldown: initialReproductionCooldown,
});

export const getPredator = (
  initialPredatorEffectiveness = 0.8,
  initialPredatorEnergy = 100,
  initialReproductionCooldown = 0
): Predator => ({
  type: CellType.Predator,
  energy: initialPredatorEnergy,
  effectiveness: initialPredatorEffectiveness,
  reproductionCooldown: initialReproductionCooldown,
});

export const getPlant = (): Plant => ({
  type: CellType.Plant,
});
