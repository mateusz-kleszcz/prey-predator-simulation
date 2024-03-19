import { createStore } from "react-hooks-global-state";
import { Parameter } from "../utils/types";
import { parameters } from "./mocks/boardParameters";

const reducer = (
  state: { parameters: Parameter[] },
  action: { type: string; index: number; value: number }
) => {
  const { type, index, value } = action;
  const newParameters = [...state.parameters];
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
