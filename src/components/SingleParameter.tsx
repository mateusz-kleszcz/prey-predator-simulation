import { Dispatch, FC } from "react";
import {
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { Parameter } from "../utils/types";

type SingleParameterProps = {
  parameter: Parameter;
  index: number;
  dispatch: (action: { type: string; index: number; value: number }) => {
    type: string;
    index: number;
    value: number;
  };
};

export const SingleParameter: FC<SingleParameterProps> = ({
  parameter,
  index,
  dispatch,
}) => {
  return (
    <Flex flexDirection="column" boxShadow="5px 5px 10px" borderRadius="5px">
      <Flex justifyContent="space-between">
        <Flex flex={4}>{parameter.name}</Flex>
        <Flex flex={2}>Actual Value: {parameter.value}</Flex>
      </Flex>
      <Flex>
        <Flex flex={1} justifyContent="center" alignItems="center">
          {parameter.min}
        </Flex>
        <Flex flex={8}>
          <Slider
            min={parameter.min}
            max={parameter.max}
            step={parameter.step}
            value={parameter.value}
            onChange={(e) => {
              dispatch({
                type: "change",
                index,
                value: e,
              });
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
        <Flex flex={1} justifyContent="center" alignItems="center">
          {parameter.max}
        </Flex>
      </Flex>
    </Flex>
  );
};
