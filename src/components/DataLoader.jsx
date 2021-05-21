import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "./BackendUrl";
import { useData } from "./DataContext/DataContext";
import { ADD_TO_HISTORY } from "./Utils/constants";

export function DataLoader() {
  const { DataDispatch } = useData();
  useEffect(() => {
    (async function getHistory() {
      const { data } = await axios.get(`${BACKEND_URL}history`);
      console.log(data);
      if (data.success) {
        data.history.map((video) =>
          DataDispatch({ type: ADD_TO_HISTORY, payLoad: video })
        );
      }
    })();
  }, []);

  return null;
}
