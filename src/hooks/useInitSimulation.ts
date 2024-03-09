import { useCallback, useState } from "react";
import { generateBoard } from "../utils/generateBoard";
import { getNextEpoch } from "../utils/getNextEpoch";

const [initialBoard, initialPreys, initialPredators] = generateBoard();

export const useInitSimulation = () => {
  const [board, setBoard] = useState(initialBoard);
  const [preys, setPreys] = useState(initialPreys);
  const [predators, setPredators] = useState(initialPredators);

  const onNextEpoch = useCallback(() => {
    const [newBoard, newPreys, newPredators] = getNextEpoch([...board], [...preys], [...predators]);
    setBoard([...newBoard])
    setPreys([...newPreys])
    setPredators([...newPredators])
  }, [board, predators, preys])

  return { board, onNextEpoch }
}