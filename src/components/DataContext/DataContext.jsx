import { createContext, useReducer, useContext } from "react";
import { DataReducer } from "../DataReducer/DataReducer";
import { history, liked, playlist } from "../Utils/constants";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // const history = [];
  const [state, DataDispatch] = useReducer(DataReducer, {
    history,
    liked,
    playlist
  });

  return (
    <DataContext.Provider
      value={
        (DataReducer,
        {
          history: state.history,
          liked: state.liked,
          playlist: state.playlist,
          DataDispatch
        })
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
