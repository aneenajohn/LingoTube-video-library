import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "./BackendUrl";
import { useData } from "./DataContext/DataContext";
import {
  ADD_TO_HISTORY,
  ADD_TO_LIKED,
  ADD_TO_PLAYLIST,
  SET_PLAYLIST,
  SET_HISTORY,
  SET_LIKED
} from "./Utils/constants";

export function DataLoader() {
  const { DataDispatch } = useData();
  useEffect(() => {
    (async function getHistory() {
      const {
        data: { success, history }
      } = await axios.get(`${BACKEND_URL}history`);
      // console.log(data);
      // if (data.success) {
      //   data.history.map((video) =>
      //     DataDispatch({ type: ADD_TO_HISTORY, payLoad: video })
      //   );
      // }
      if (success) {
        DataDispatch({ type: SET_HISTORY, payLoad: history });
      }
    })();

    (async function getLiked() {
      const {
        data: { success, liked }
      } = await axios.get(`${BACKEND_URL}liked`);
      // console.log(data);
      // if (data.success) {
      //   data.liked.map((video) =>
      //     DataDispatch({ type: ADD_TO_LIKED, payLoad: video })
      //   );
      // }
      if (success) {
        DataDispatch({ type: SET_LIKED, payLoad: liked });
      }
    })();

    (async function getPlaylists() {
      try {
        const {
          data: { success, playlists }
        } = await axios.get(`${BACKEND_URL}playlist`);
        console.log("playlist", success, playlists);
        if (success) {
          // playlists.map((playlist) =>
          //   DataDispatch({ type: ADD_TO_PLAYLIST, payLoad: playlist })
          // );
          DataDispatch({ type: SET_PLAYLIST, payLoad: playlists });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [DataDispatch]);

  return null;
}
