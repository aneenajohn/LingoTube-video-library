import {
  ADD_TO_HISTORY,
  REMOVE_FROM_HISTORY,
  ADD_TO_LIKED,
  REMOVE_FROM_LIKED,
  ADD_TO_PLAYLIST,
  CREATE_NEW_PLAYLIST
} from "../Utils/constants";
import uuid from "react-uuid";
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
    case ADD_TO_LIKED:
      return {
        ...state,
        liked: state.liked.find((item) => item._id === action.payLoad._id)
          ? state.liked.filter((item) => item.id !== action.payLoad._id)
          : [...state.liked, action.payLoad]
      };
    case REMOVE_FROM_LIKED:
      return {
        ...state,
        liked: state.liked.filter((item) => item._id !== action.payLoad)
      };
    case ADD_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payLoad]
      };
    case CREATE_NEW_PLAYLIST:
      return {
        ...state,
        playlist: [
          ...state.playlist,
          { playlistName: action.payload, videos: [] }
        ]
      };
    default:
      return state;
  }
};
