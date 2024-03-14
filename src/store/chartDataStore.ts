import { createStore } from "react-hooks-global-state";

const reducer = (
  state: { data: { preys: number; predators: number }[] },
  action: { type: string; value: { preys: number; predators: number } }
) => {
  const { type, value } = action;
  const newData = [...state.data];
  newData.push(value);

  switch (type) {
    case "add":
      return { ...state, data: newData };
    default:
      return state;
  }
};

const initialState = { data: [] };

export const { dispatch, useStoreState } = createStore(reducer, initialState);
