import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import "./App.css";
import { Board } from "./components/Board";
import { useInitSimulation } from "./hooks/useInitSimulation";
import { SimulationPanel } from "./components/SimulationPanel";
import { Visualization } from "./components/Visualization";
import { useState } from "react";
import { BoardConfiguration } from "./components/BoardConfiguration";
import { useStoreState } from "./store/boardStore";

function App() {
  const parameters = useStoreState("parameters");
  const { board, onNextEpoch } = useInitSimulation(
    ...parameters.map((parameter) => parameter.value)
  );
  const [simulationRun, setSimulationRun] = useState(false);

  const simulateClick = () => {
    setSimulationRun(true);
  };

  return (
    <ChakraProvider>
      <Flex flex={1} justifyContent="center">
        {simulationRun && (
          <>
            <Box flex={7}>
              <Board board={board} />
              <Visualization />
            </Box>
            <SimulationPanel onNextEpoch={onNextEpoch} />
          </>
        )}
        {!simulationRun && <BoardConfiguration simulateClick={simulateClick} />}
      </Flex>
    </ChakraProvider>
  );
}

export default App;
