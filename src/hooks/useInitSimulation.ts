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
      [...board],
      [...preys],
      [...predators],
      parameters[0].value,
      parameters[1].value,
      parameters[2].value,
      parameters[3].value,
      parameters[4].value,
      parameters[5].value,
      parameters[6].value,
      parameters[7].value,
      parameters[8].value,
      parameters[9].value,
      parameters[10].value
    );
    // console.log(newBoard);
    setBoard([...newBoard]);
    setPreys([...newPreys]);
    setPredators([...newPredators]);
  }, [board, predators, preys, parameters]);

  return {
    board,
    onNextEpoch,
  };
};
