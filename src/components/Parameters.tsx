import { FC } from "react";
import { SingleParameter } from "./SingleParameter";
import { useStoreState } from "../store/simulationStore";
import { Flex } from "@chakra-ui/react";
import { Parameter } from "../utils/types";

type ParametersProps = {
  parameters: Parameter[];
  dispatch: (action: { type: string; index: number; value: number }) => {
    type: string;
    index: number;
    value: number;
  };
};

export const Parameters: FC<ParametersProps> = ({ parameters, dispatch }) => {
  return (
    <Flex flexDirection="column" gap={6}>
      {parameters.map((element, index) => {
        return (
          <SingleParameter
            key={`param${index}`}
            parameter={element}
            index={index}
            dispatch={dispatch}
          />
        );
      })}
    </Flex>
  );
};
