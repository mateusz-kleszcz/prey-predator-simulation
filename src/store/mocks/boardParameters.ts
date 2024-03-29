export const parameters = [
  {
    name: "Width",
    min: 10,
    max: 40,
    step: 1,
    value: 30,
  },
  {
    name: "Height",
    min: 10,
    max: 40,
    step: 1,
    value: 30,
  },
  {
    name: "Starting Number of Preys",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.3,
  },
  {
    name: "Starting Number of Predators",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.15,
  },
  {
    name: "Starting Number of Plants (of remaining fields)",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.5,
  },
  {
    name: "Initial Prey Escape",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.2,
  },
  {
    name: "Initial Predator Effectiveness",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.6,
  },
  {
    name: "Initial Prey Energy",
    min: 10,
    max: 100,
    step: 1,
    value: 100,
  },
  {
    name: "Initial Predator Energy",
    min: 10,
    max: 100,
    step: 1,
    value: 100,
  },
  {
    name: "Prey Initial Cooldown of Reproduction",
    min: 0,
    max: 10,
    step: 1,
    value: 1,
  },
  {
    name: "Predator Initial Cooldown of Reproduction",
    min: 0,
    max: 10,
    step: 1,
    value: 1,
  },
];
