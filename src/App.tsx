import { Button, ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { Board } from './components/Board';
import { useInitSimulation } from './hooks/useInitSimulation';

function App() {
  const { board, onNextEpoch } = useInitSimulation();

  return (
    <ChakraProvider>
      <Board board={board} />
      <Button onClick={onNextEpoch}>Next</Button>
    </ChakraProvider>
  );
}

export default App;
