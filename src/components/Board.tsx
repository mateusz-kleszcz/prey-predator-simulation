import { Flex } from "@chakra-ui/react";
import { Cell } from "./Cell"
import { FC } from "react";
import { BoardType } from "../utils/generateBoard";

type BoardProps = {
  board: BoardType;
}

export const Board: FC<BoardProps> = ({ board }) => {
  return (
    <>
      {
        board.map((rows, i) => (
          <Flex key={`row-${i}`}>
            {rows.map((cell, j) => <Cell type={cell.type} energy={cell?.energy} key={`column-${j}`} />)}
          </Flex>
        ))
      }
    </>
  )
}