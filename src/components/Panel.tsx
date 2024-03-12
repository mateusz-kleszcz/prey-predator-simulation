import { FC, useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Parameters } from "./Parameters";

type PanelProps = {
  onNextEpoch: () => void;
};

export const Panel: FC<PanelProps> = ({ onNextEpoch }) => {
  const [simulate, setSimulate] = useState(false);
  const [intervalID, setIntervalID] = useState<null | NodeJS.Timer>(null);

  const simulateClick = () => {
    setSimulate(!simulate);
  };

  useEffect(() => {
    if (simulate) {
      setIntervalID(
        setInterval(() => {
          onNextEpoch();
        }, 1000)
      );
    } else {
      if (intervalID != null) {
        clearInterval(intervalID);
      }
      setIntervalID(null);
    }
  }, [simulate]);

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
      <Parameters />
    </Flex>
  );
};
