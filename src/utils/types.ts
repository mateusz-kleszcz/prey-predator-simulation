export enum CellType {
  Empty = "Empty",
  Prey = "Prey",
  Predator = "Predator",
  Plant = "Plant",
}

export type Cell = { type: CellType.Empty } | Prey | Predator | Plant;

export type Prey = {
  type: CellType.Prey;
  energy: number;
  escape: number;
  reproductionCooldown: number;
};

export type Predator = {
  type: CellType.Predator;
  energy: number;
  effectiveness: number;
  reproductionCooldown: number;
};

export type Plant = {
  type: CellType.Plant;
};

export type Parameter = {
  name: string;
  min: number;
  max: number;
  step: number;
  value: number;
};
