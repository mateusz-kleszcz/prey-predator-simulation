import { FC } from "react";
import { SingleParameter } from "./SingleParameter";
import { Flex } from "@chakra-ui/react";
import { Parameter } from "../utils/types";

type ParametersProps = {
  parameters: Parameter[];
  dispatch: (action: { type: string; index: number; value: number }) => {
    type: string;
    index: number;
    value: number;
  };
  disabled?: boolean;
};

export const Parameters: FC<ParametersProps> = ({
  parameters,
  dispatch,
  disabled = false,
}) => {
  return (
    <Flex flexDirection="column" gap={6}>
      {parameters.map((element, index) => {
        return (
          <SingleParameter
            key={`param${index}`}
            parameter={element}
            index={index}
            disabled={disabled}
            dispatch={dispatch}
          />
        );
      })}
    </Flex>
  );
};
