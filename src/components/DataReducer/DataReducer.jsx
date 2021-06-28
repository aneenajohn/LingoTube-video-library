import {
  ADD_TO_HISTORY,
  REMOVE_FROM_HISTORY,
  ADD_TO_LIKED,
  REMOVE_FROM_LIKED,
  ADD_TO_PLAYLIST,
  CREATE_NEW_PLAYLIST,
  SET_PLAYLIST_CHOSEN,
  ADD_VIDEO_TO_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
  SET_PLAYLIST,
  SET_HISTORY,
  SET_LIKED,
  CLEAR_HISTORY
} from "../Utils/constants";

export const DataReducer = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case SET_HISTORY:
      return { ...state, history: action.payLoad };
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
    case SET_LIKED:
      return { ...state, liked: action.payLoad };
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
    case SET_PLAYLIST_CHOSEN:
      return { ...state, chosenPlaylist: action.payLoad };
    case SET_PLAYLIST:
      return { ...state, playlist: action.payLoad };
    case ADD_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payLoad]
      };
    case ADD_VIDEO_TO_PLAYLIST:
      return {
        ...state,
        playlist: addToPlaylist({
          playlist: state.playlist,
          playlistId: action.payLoad.playlistId,
          video: action.payLoad.video
        })
      };

    case REMOVE_VIDEO_FROM_PLAYLIST:
      const playlistIndex = state.playlist.findIndex(
        (item) => item._id === action.payLoad.playlistId
      );
      const videoIndex = state.playlist[playlistIndex].videos.findIndex(
        (video) => video._id === action.payLoad._id
      );
      if (playlistIndex !== -1) {
        state.playlist[playlistIndex].videos.splice(videoIndex, 1);
      }
      return { ...state, playlist: [state.playlist] };
    // return {
    //   ...state,
    //   playlist: removeFromPlaylist({
    //     playlist: state.playlist,
    //     playlistId: action.payLoad.playlistId,
    //     videoId: action.payLoad._id
    //   })
    // };
    case CLEAR_HISTORY:
      return {
        ...state,
        history: []
      };

    default:
      return state;
  }
};

function addToPlaylist({ playlist, playlistId, video }) {
  const playlistFound = playlist.find((item) => item._id === playlistId);
  // console.log(playlistFound);
  const isVideoFound = playlistFound.videos.find(
    (item) => item.id === video._id
  );
  console.log({ isVideoFound });
  if (isVideoFound) {
    return playlist;
  } else {
    playlistFound.videos.push(video);
    // return playlistFound;
    return playlist.map((item) =>
      item._id === playlistId ? playlistFound : item
    );
  }
}

function removeFromPlaylist({ playlist, playlistId, videoId }) {
  const playlistFound = playlist.find((item) => item._id === playlistId);
  console.log({ playlistFound });
  console.log({ videoId });
  const updatedPlaylist = {
    ...playlistFound,
    videos: playlistFound.videos.filter((video) => video._id !== videoId)
  };
  console.log({ updatedPlaylist });
  return playlist.map((item) =>
    item._id === playlistId ? updatedPlaylist : item
  );
}
