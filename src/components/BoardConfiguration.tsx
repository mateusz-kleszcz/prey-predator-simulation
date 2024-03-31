import { FC } from "react";
import { dispatch, useStoreState } from "../store/boardStore";
import { Parameters } from "./Parameters";
import { Button, Flex } from "@chakra-ui/react";

type BoardConfigurationProps = {
  simulateClick: () => void;
};

export const BoardConfiguration: FC<BoardConfigurationProps> = ({
  simulateClick,
}) => {
  const parameters = useStoreState("parameters");

  return (
    <Flex width="50%" flexDirection="column" padding={2} gap={5}>
      <Parameters parameters={parameters} dispatch={dispatch} />
      <Button colorScheme="teal" onClick={simulateClick}>
        Build
      </Button>
    </Flex>
  );
};
