import { createContext, useReducer, useContext } from "react";
import { DataReducer } from "../DataReducer/DataReducer";
import { history, liked } from "../Utils/constants";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // const history = [];
  const [state, DataDispatch] = useReducer(DataReducer, { history, liked });

  return (
    <DataContext.Provider
      value={
        (DataReducer,
        {
          history: state.history,
          liked: state.liked,
          DataDispatch
        })
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
