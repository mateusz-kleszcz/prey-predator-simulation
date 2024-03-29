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
    value: 5,
  },
  {
    name: "Energy Prey Loses on Reproduction",
    min: 10,
    max: 40,
    step: 1,
    value: 30,
  },
  {
    name: "Energy Predator Loses on Reproduction",
    min: 10,
    max: 40,
    step: 1,
    value: 20,
  },
  {
    name: "Energy Prey Gains from Eating",
    min: 10,
    max: 60,
    step: 1,
    value: 50,
  },
  {
    name: "Energy Predator Gains from Eating",
    min: 10,
    max: 100,
    step: 1,
    value: 80,
  },
  {
    name: "Chance of Reproduction for Preys",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.15,
  },
  {
    name: "Chance of Reproduction for Predators",
    min: 0,
    max: 1,
    step: 0.01,
    value: 0.8,
  },
  {
    name: "Prey Cooldown of Reproduction",
    min: 0,
    max: 10,
    step: 1,
    value: 4,
  },
  {
    name: "Predators Cooldown of Reproduction",
    min: 0,
    max: 10,
    step: 1,
    value: 4,
  },
];
