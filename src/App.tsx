import { ChakraProvider, Flex } from "@chakra-ui/react";
import "./App.css";
import { Board } from "./components/Board";
import { useInitSimulation } from "./hooks/useInitSimulation";
import { Panel } from "./components/Panel";

function App() {
  const { board, onNextEpoch } = useInitSimulation();

  return (
    <ChakraProvider>
      <Flex>
        <Board board={board} />
        <Panel onNextEpoch={onNextEpoch} />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
