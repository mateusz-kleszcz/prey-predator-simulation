import { useCallback, useState } from "react";
import { generateBoard } from "../utils/generateBoard";
import { getNextEpoch } from "../utils/getNextEpoch";
import { useStoreState } from "../store/store";

const [initialBoard, initialPreys, initialPredators] = generateBoard();

export const useInitSimulation = () => {
  const [board, setBoard] = useState(initialBoard);
  const [preys, setPreys] = useState(initialPreys);
  const [predators, setPredators] = useState(initialPredators);
  const parameters = useStoreState("parameters");

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
      parameters[9].value
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
