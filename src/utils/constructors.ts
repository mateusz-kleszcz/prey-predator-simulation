import { Cell, CellType, Predator, Prey } from "./types"

export const getEmptyCell = (): Cell => ({ type: CellType.Empty })

export const getPrey = (
  initialPreyEnergy = 100,
  initialPreyEscape = 0.1,
  initialReproductionCooldown = 0,
): Prey => ({
  type: CellType.Prey,
  energy: initialPreyEnergy,
  escape: initialPreyEscape,
  reproductionCooldown: initialReproductionCooldown,
})

export const getPredator = (
  initialPredatorEnergy = 100,
  initialPredatorEffectiveness = 0.8,
  initialReproductionCooldown = 0,
): Predator => ({
  type: CellType.Predator,
  energy: initialPredatorEnergy,
  effectiveness: initialPredatorEffectiveness,
  reproductionCooldown: initialReproductionCooldown,
})