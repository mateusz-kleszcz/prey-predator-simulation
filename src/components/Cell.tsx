import { Box } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { CellType } from "../utils/types"

type CellProps = {
  type: CellType;
  energy?: number;
};

export const Cell: FC<CellProps> = ({ type, energy }) => {
  const color = useMemo(() => {
    switch (type) {
      case CellType.Empty:
        return 'white';
      case CellType.Plant:
        return 'yellow';
      case CellType.Predator:
        return 'red';
      case CellType.Prey:
        return 'green';
    }
  }, [type]);

  return (
    <Box boxSize="30px" border="1px solid black" bg={color}>{energy}</Box>
  )
}