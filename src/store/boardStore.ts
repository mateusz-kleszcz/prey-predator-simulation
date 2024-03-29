import { createStore } from "react-hooks-global-state";
import { Parameter } from "../utils/types";
import { parameters } from "./mocks/boardParameters";

const reducer = (
  state: { parameters: Parameter[] },
  action: { type: string; index: number; value: number }
) => {
  const { type, index, value } = action;
  const newParameters = [...state.parameters];
  if (index == 2 && value + newParameters[3].value >= 1) {
    newParameters[3].value =
      Math.round((newParameters[3].max - value) * 100) / 100;
  } else if (index == 3 && value + newParameters[2].value >= 1) {
    newParameters[2].value =
      Math.round((newParameters[2].max - value) * 100) / 100;
  }
  newParameters[index].value = value;

  switch (type) {
    case "change":
      return { ...state, parameters: newParameters };
    default:
      return state;
  }
};

const initialState = { parameters };

export const { dispatch, useStoreState } = createStore(reducer, initialState);
