import { createContext, useReducer, useContext } from "react";
import { DataReducer } from "../DataReducer/DataReducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const history = [];
  const [state, DataDispatch] = useReducer(DataReducer, { history });

  return (
    <DataContext.Provider
      value={
        (DataReducer,
        {
          history: state.history,
          DataDispatch
        })
      }
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
