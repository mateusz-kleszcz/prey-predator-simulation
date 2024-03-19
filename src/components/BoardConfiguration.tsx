import { FC } from "react";
import { dispatch, useStoreState } from "../store/boardParameters";
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
    <Flex width="50%" flexDirection="column" padding={10} gap={5}>
      <Parameters parameters={parameters} dispatch={dispatch} />
      <Button onClick={simulateClick}>Build</Button>
    </Flex>
  );
};
