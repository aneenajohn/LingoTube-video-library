import { ADD_TO_HISTORY, REMOVE_FROM_HISTORY } from "../Utils/constants";
export const DataReducer = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case ADD_TO_HISTORY:
      return {
        ...state,
        history: state.history.find(
          (item) => Number(item._id) === Number(action.payLoad._id)
        )
          ? state.history.filter((item) => item._id !== action.payLoad._id)
          : [...state.history, action.payLoad]
      };
    case REMOVE_FROM_HISTORY:
      return {
        ...state,
        history: state.history.filter((item) => item._id !== action.payLoad)
      };
    default:
      return state;
  }
};
