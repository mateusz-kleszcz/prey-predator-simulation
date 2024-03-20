import { FC, useEffect, useRef, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Parameters } from "./Parameters";
import { dispatch, useStoreState } from "../store/simulationStore";

type SimulationPanelProps = {
  onNextEpoch: () => void;
};

export const SimulationPanel: FC<SimulationPanelProps> = ({ onNextEpoch }) => {
  const [simulate, setSimulate] = useState(false);
  const intervalRef = useRef<null | NodeJS.Timer>(null);
  const parameters = useStoreState("parameters");

  const simulateClick = () => {
    setSimulate(!simulate);
  };

  useEffect(() => {
    if (simulate) {
      intervalRef.current = setInterval(() => {
        onNextEpoch();
      }, 200);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [onNextEpoch, simulate]);

  return (
    <Flex flex={3} flexDirection="column" padding={3} gap={5}>
      <Flex gap={5}>
        <Button
          colorScheme={simulate ? "red" : "teal"}
          flex={1}
          onClick={simulateClick}
        >
          Simulate
        </Button>
        <Button colorScheme="cyan" flex={1} onClick={onNextEpoch}>
          Next
        </Button>
      </Flex>
      <Parameters
        parameters={parameters}
        disabled={simulate}
        dispatch={dispatch}
      />
    </Flex>
  );
};
