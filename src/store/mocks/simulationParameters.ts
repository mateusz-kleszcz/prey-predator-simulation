export const parameters = [
  {
    name: "Energy Prey Loses on Walking",
    min: 1,
    max: 20,
    step: 1,
    value: 10,
  },
  {
    name: "Energy Predator Loses on Walking",
    min: 1,
    max: 20,
    step: 1,
    value: 8,
  },
  {
    name: "Energy Prey Loses on Reproduction",
    min: 5,
    max: 40,
    step: 1,
    value: 30,
  },
  {
    name: "Energy Predator Loses on Reproduction",
    min: 5,
    max: 40,
    step: 1,
    value: 10,
  },
  {
    name: "Energy Prey Gains from Eating",
    min: 10,
    max: 100,
    step: 1,
    value: 80,
  },
  {
    name: "Energy Predator Gains from Eating",
    min: 10,
    max: 100,
    step: 1,
    value: 100,
  },
  {
    name: "Chance of Reproduction for Preys",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.6,
  },
  {
    name: "Chance of Reproduction for Predators",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.6,
  },
  {
    name: "Prey Cooldown of Reproduction",
    min: 0,
    max: 10,
    step: 1,
    value: 0,
  },
  {
    name: "Predators Cooldown of Reproduction",
    min: 0,
    max: 10,
    step: 1,
    value: 0,
  },
  {
    name: "Number of New Plants (of remaining fields)",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.1,
  },
  {
    name: "Constant Escape for Preys Reproduction",
    min: 0,
    max: 0.15,
    step: 0.01,
    value: 0.1,
  },
  {
    name: "Constant Effectiveness for Predators Reproduction",
    min: 0,
    max: 0.15,
    step: 0.01,
    value: 0.02,
  },
];
