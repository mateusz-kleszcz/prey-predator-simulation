import { Flex } from "@chakra-ui/react";
import { Cell } from "./Cell";
import { FC } from "react";
import { BoardType } from "../utils/generateBoard";
import { CellType } from "../utils/types";

type BoardProps = {
  board: BoardType;
};

export const Board: FC<BoardProps> = ({ board }) => {
  return (
    <Flex flex={7} flexDirection="column" padding={3}>
      {board.map((rows, i) => (
        <Flex key={`row-${i}`}>
          {rows.map((cell, j) =>
            cell.type != CellType.Empty ? (
              <Cell
                type={cell.type}
                energy={cell?.energy}
                key={`column-${j}`}
              />
            ) : (
              <Cell type={cell.type} key={`column-${j}`} />
            )
          )}
        </Flex>
      ))}
    </Flex>
  );
};
