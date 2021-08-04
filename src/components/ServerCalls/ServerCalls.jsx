import axios from "axios";
import { BACKEND_URL } from "../BackendUrl";
import {
  ADD_TO_HISTORY,
  ADD_TO_LIKED,
  REMOVE_FROM_HISTORY,
  REMOVE_FROM_LIKED,
  REMOVE_VIDEO_FROM_PLAYLIST,
  CLEAR_HISTORY,
  DELETE_PLAYLIST
} from "../Utils/constants";
import { toast } from "react-toastify";

export const loginService = async (email, password) => {
  try {
    return await axios.post(`${BACKEND_URL}users/login`, {
      email,
      password
    });
  } catch (err) {
    console.log("err :", err);
  }
};

export const signUpService = async (firstname, lastname, email, password) => {
  try {
    const response = await axios.post(`${BACKEND_URL}users/signup`, {
      firstname,
      lastname,
      email,
      password
    });
    return response;
  } catch (err) {
    console.log("error in signup: ", err);
  }
};

export const addToHistoryHandler = async (
  video,
  history,
  DataDispatch,
  userToken
) => {
  const itemFound = history.find((item) => item._id === video._id);
  if (!itemFound) {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}history`,
        {
          _id: video._id
        },
        {
          headers: {
            authorization: userToken
          }
        }
      );
      if (data.success) {
        DataDispatch({
          type: ADD_TO_HISTORY,
          payLoad: video
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const deleteFromHistory = async (
  id,
  title,
  history,
  DataDispatch,
  userToken
) => {
  try {
    // DataDispatch({ type: REMOVE_FROM_HISTORY, payLoad: id });
    // toast.dark(`${title} is removed from history`, {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: true
    // });
    // console.log("token in history", userToken);
    const { data } = await axios.delete(`${BACKEND_URL}history/${id}`, {
      headers: {
        authorization: userToken
      }
    });
    if (data.success) {
      DataDispatch({ type: REMOVE_FROM_HISTORY, payLoad: id });
      toast.dark(`${title} is removed from history`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  } catch (err) {
    console.error("Error happened", err);
  }
};

export const deleteAllHandler = async (
  deleteAllLabel,
  DataDispatch,
  userToken
) => {
  try {
    console.log("token in delete all history", userToken);
    const {
      data: { success, history }
    } = await axios.post(`${BACKEND_URL}history/clear-history`, {
      headers: {
        authorization: userToken
      }
    });
    console.log(success, history);
    if (success) {
      DataDispatch({ type: CLEAR_HISTORY });
      toast.dark(`Deleted all files from history`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  } catch (err) {
    console.error("Error happened", err);
  }
};

export const addToLiked = async (video, liked, DataDispatch, userToken) => {
  const itemFound = liked.find((item) => item._id === video._id);
  if (!itemFound) {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}liked`,
        {
          _id: video._id
        },
        {
          headers: {
            authorization: userToken
          }
        }
      );
      if (data.success) {
        DataDispatch({
          type: ADD_TO_LIKED,
          payLoad: video
        });
        toast.success(`Video added to liked videos`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
};

export const deleteFromLiked = async (
  id,
  title,
  liked,
  DataDispatch,
  userToken
) => {
  try {
    // console.log("token in liked", userToken);
    const { data } = await axios.delete(`${BACKEND_URL}liked/${id}`, {
      headers: {
        authorization: userToken
      }
    });
    if (data.success) {
      DataDispatch({ type: REMOVE_FROM_LIKED, payLoad: id });
      toast.dark(`${title} is removed from liked videos`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteVideoFromPlaylist = async (
  _id,
  title,
  DataDispatch,
  playlistId,
  userToken
) => {
  try {
    // DataDispatch({
    //   type: REMOVE_VIDEO_FROM_PLAYLIST,
    //   payLoad: { playlistId, _id }
    // });
    // toast.dark(`${title} is removed from playlist`, {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: true
    // });

    const {
      data: { success }
    } = await axios.delete(`${BACKEND_URL}playlist/${playlistId}/${_id}`, {
      headers: {
        authorization: userToken
      }
    });

    if (success) {
      DataDispatch({
        type: REMOVE_VIDEO_FROM_PLAYLIST,
        payLoad: { playlistId, _id }
      });
      toast.dark(`${title} is removed from playlist`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const deletePlaylistClicked = async (
  playlistId,
  playlistName,
  DataDispatch,
  userToken
) => {
  try {
    console.log("userToken from delete playlist", userToken);
    const { data } = await axios.delete(
      `${BACKEND_URL}playlist/${playlistId}`,
      {
        headers: {
          authorization: userToken
        }
      }
    );
    if (data.success) {
      toast.dark(`${playlistName} is removed from playlist`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
      DataDispatch({
        type: DELETE_PLAYLIST,
        payLoad: playlistId
      });
    }
  } catch (err) {
    console.error(err);
  }
};
