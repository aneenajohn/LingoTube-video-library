import {
  ADD_TO_HISTORY,
  REMOVE_FROM_HISTORY,
  ADD_TO_LIKED,
  REMOVE_FROM_LIKED,
  ADD_TO_PLAYLIST,
  CREATE_NEW_PLAYLIST,
  SET_PLAYLIST_CHOSEN,
  ADD_VIDEO_TO_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST
} from "../Utils/constants";

export const DataReducer = (state, action) => {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
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
    case ADD_TO_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payLoad]
      };
    case ADD_VIDEO_TO_PLAYLIST:
      // console.log("inside add video");
      let playlistIndex = state.playlist.findIndex(
        (item) => Number(item._id) === Number(action.payLoad.playlistId)
      );
      console.log({ playlistIndex });
      state.playlist[playlistIndex]?.videos.unshift(action.payLoad.videoId);

      return { ...state };

    // return {
    //   ...state,
    //   playlist: [
    //     ...state.playlist,
    //     state.playlist[playlistIndex]?.videos.action?.payLoad.video
    //   ]
    // };

    case REMOVE_VIDEO_FROM_PLAYLIST:
      // let index = state.playlist.findIndex(
      //   (item) => Number(item._id) === Number(action.payLoad.playlistId)
      // );
      // console.log(index);
      state.playlist[action.payLoad.index]?.videos.filter(
        (item) => item._id !== action.payLoad._id
      );
      return { ...state };
    // return {
    //   ...state,
    //   playlist: [
    //     ...state.playlist,
    //     state.playlist[index]?.videos.filter(
    //       (item) => item._id !== action.payLoad._id
    //     )
    //   ]
    // };
    // let filteredVideos = state.playlist[index]?.videos.filter(
    //   (video) => video._id !== action.payLoad._id
    // );
    // console.log({ filteredVideos });
    // return { ...state };

    // let videoIndex = state.playlist[index].videos.findIndex(
    //   (item) => item.id === action.payLoad._id
    // );
    // console.log(state.playlist[index].videos);
    // console.log("videoIndex", videoIndex);
    // return {
    //   ...state,
    //   playlist: [
    //     ...state.playlist,
    //     state.playlist[index].videos.splice(videoIndex, 1)
    //   ]
    // };

    // return {
    //   ...state,
    //   playlist: state.playlist[index].videos.filter(
    //     (video) => video._id !== action.payLoad._id
    //   )
    // };
    // case CREATE_NEW_PLAYLIST:
    //   return {
    //     ...state,
    //     playlist: [
    //       ...state.playlist,
    //       playlist: [...state.playlist, action.payLoad]
    //       // { playlistName: action.payload, videos: [] }
    //     // ]
    //   };
    default:
      return state;
  }
};
