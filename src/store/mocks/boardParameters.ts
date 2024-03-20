export const parameters = [
  {
    name: "Width",
    min: 10,
    max: 40,
    step: 1,
    value: 40,
  },
  {
    name: "Height",
    min: 10,
    max: 40,
    step: 1,
    value: 10,
  },
  {
    name: "Starting Number of Preys",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.2,
  },
  {
    name: "Starting Number of Predators",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.14,
  },
  {
    name: "Starting Number of Plants (of remaining fields)",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.02,
  },
];
