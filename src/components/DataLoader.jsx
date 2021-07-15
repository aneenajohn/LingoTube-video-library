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
  SET_LIKED,
  liked
} from "./Utils/constants";
import { useAuth } from "./Context/authProvider";

export function DataLoader() {
  const {
    authState: { userToken }
  } = useAuth();
  const { DataDispatch } = useData();
  useEffect(() => {
    (async function getHistory() {
      const {
        data: { success, history }
      } = await axios.get(`${BACKEND_URL}history`, {
        headers: {
          authorization: userToken
        }
      });
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
      } = await axios.get(`${BACKEND_URL}liked`, {
        headers: {
          authorization: userToken
        }
      });
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
        } = await axios.get(`${BACKEND_URL}playlist`, {
          headers: {
            authorization: userToken
          }
        });
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
  }, [DataDispatch, userToken]);

  return null;
}
