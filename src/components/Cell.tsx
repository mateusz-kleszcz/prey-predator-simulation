import { Flex } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { CellType } from "../utils/types";

type CellProps = {
  type: CellType;
  energy?: number;
};

export const Cell: FC<CellProps> = ({ type, energy }) => {
  const color = useMemo(() => {
    switch (type) {
      case CellType.Empty:
        return "white";
      case CellType.Plant:
        return "yellow";
      case CellType.Predator:
        return "red";
      case CellType.Prey:
        return "green";
    }
  }, [type]);

  return (
    <Flex
      flex={1}
      aspectRatio={1}
      border="1px solid black"
      justifyContent="center"
      alignItems="center"
      boxSizing="border-box"
      overflow="hidden"
      bg={color}
    >
      {energy}
    </Flex>
  );
};
