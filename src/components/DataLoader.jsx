import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "./BackendUrl";
import { useData } from "./DataContext/DataContext";
import { ADD_TO_HISTORY, ADD_TO_LIKED } from "./Utils/constants";

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

    (async function getLiked() {
      const { data } = await axios.get(`${BACKEND_URL}liked`);
      console.log(data);
      if (data.success) {
        data.liked.map((video) =>
          DataDispatch({ type: ADD_TO_LIKED, payLoad: video })
        );
      }
    })();
  }, []);

  return null;
}
