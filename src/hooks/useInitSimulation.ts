import { useCallback, useEffect, useState } from "react";
import { generateBoard } from "../utils/generateBoard";
import { getNextEpoch } from "../utils/getNextEpoch";
import { useStoreState } from "../store/simulationStore";

export const useInitSimulation = (
  width = 30,
  height = 30,
  startingNumberOfPreys = 0.3,
  startingNumberOfPredators = 0.15,
  startingNumberOfPlantsRemaining = 0.5,
  initialPreyEscape = 0.2,
  initialPredatorEffectiveness = 0.6,
  initialPreyEnergy = 100,
  initialPredatorEnergy = 100,
  initialPreyReproductionCooldown = 1,
  initialPredatorReproductionCooldown = 1
) => {
  const [board, setBoard] = useState<any[][]>([]);
  const [preys, setPreys] = useState<any[][]>([]);
  const [predators, setPredators] = useState<any[][]>([]);
  const parameters = useStoreState("parameters");

  useEffect(() => {
    const [initialBoard, initialPreys, initialPredators] = generateBoard(
      width,
      height,
      startingNumberOfPreys,
      startingNumberOfPredators,
      startingNumberOfPlantsRemaining,
      initialPreyEscape,
      initialPredatorEffectiveness,
      initialPreyEnergy,
      initialPredatorEnergy,
      initialPreyReproductionCooldown,
      initialPredatorReproductionCooldown
    );
    setBoard(initialBoard);
    setPreys(initialPreys);
    setPredators(initialPredators);
  }, [
    width,
    height,
    startingNumberOfPreys,
    startingNumberOfPredators,
    startingNumberOfPlantsRemaining,
    initialPreyEscape,
    initialPredatorEffectiveness,
    initialPreyEnergy,
    initialPredatorEnergy,
    initialPreyReproductionCooldown,
    initialPredatorReproductionCooldown,
  ]);

  const onNextEpoch = useCallback(() => {
    const [newBoard, newPreys, newPredators] = getNextEpoch(
      JSON.parse(JSON.stringify(board)),
      [...preys],
      [...predators],
      ...parameters.map((parameter) => parameter.value)
    );
    setBoard([...newBoard]);
    setPreys([...newPreys]);
    setPredators([...newPredators]);
  }, [board, predators, preys, parameters]);

  return {
    board,
    onNextEpoch,
  };
};
