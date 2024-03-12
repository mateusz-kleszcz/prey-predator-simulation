import { FC } from "react";
import { SingleParameter } from "./SingleParameter";
import { useStoreState } from "../store/store";
import { Flex } from "@chakra-ui/react";

export const Parameters: FC = () => {
  const parameters = useStoreState("parameters");

  return (
    <Flex flexDirection="column" gap={6}>
      {parameters.map((element, index) => {
        return (
          <SingleParameter
            key={`param${index}`}
            parameter={element}
            index={index}
          />
        );
      })}
    </Flex>
  );
};
