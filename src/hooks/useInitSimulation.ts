import { useCallback, useEffect, useState } from "react";
import { generateBoard } from "../utils/generateBoard";
import { getNextEpoch } from "../utils/getNextEpoch";
import { useStoreState } from "../store/simulationStore";

export const useInitSimulation = (
  width: number,
  height: number,
  startingNumberOfPreys: number,
  startingNumberOfPredators: number,
  startingNumberOfPlantsRemaining: number
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
      startingNumberOfPlantsRemaining
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
  ]);

  const onNextEpoch = useCallback(() => {
    const [newBoard, newPreys, newPredators] = getNextEpoch(
      JSON.parse(JSON.stringify(board)),
      [...preys],
      [...predators],
      ...parameters.map(parameter => parameter.value),
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
