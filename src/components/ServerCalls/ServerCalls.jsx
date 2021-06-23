import axios from "axios";
import { BACKEND_URL } from "../BackendUrl";
import {
  ADD_TO_HISTORY,
  ADD_TO_LIKED,
  REMOVE_FROM_HISTORY,
  REMOVE_FROM_LIKED
} from "../Utils/constants";
import { toast } from "react-toastify";

export const addToHistoryHandler = async (video, history, DataDispatch) => {
  const itemFound = history.find((item) => item._id === video._id);
  if (!itemFound) {
    try {
      const { data } = await axios.post(`${BACKEND_URL}history`, {
        _id: video._id
      });
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

export const deleteFromHistory = async (id, title, history, DataDispatch) => {
  try {
    const { data } = await axios.delete(`${BACKEND_URL}history/${id}`);
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

export const addToLiked = async (video, liked, DataDispatch) => {
  const itemFound = liked.find((item) => item._id === video._id);
  if (!itemFound) {
    try {
      const { data } = await axios.post(`${BACKEND_URL}liked`, {
        _id: video._id
      });
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

export const deleteFromLiked = async (id, title, liked, DataDispatch) => {
  try {
    const { data } = await axios.delete(`${BACKEND_URL}liked/${id}`);
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

// export const deleteVideoFromPlaylist = async (id, title, DataDispatch) => {};
