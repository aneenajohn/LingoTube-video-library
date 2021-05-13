export const videoReducer = (state, action) => {
  console.log(action.type);
  console.log(action.payLoad);
  switch (action.type) {
    case "LANGUAGE":
      return { ...state, language: action.payLoad };
    case "ADD_TO_VIDEOLIST":
      return {
        ...state,
        videoList: state.videoList.concat({
          _id: action.payLoad._id,
          title: action.payLoad.title,
          language: action.payLoad.language,
          videoEmbedUrl: action.payLoad.videoEmbedUrl,
          duration: action.payLoad.duration,
          channelName: action.payLoad.channelName,
          channelDp: action.payLoad.dp,
          imageUrl: action.payLoad.imageUrl,
          hoverImageUrl: action.payLoad.hoverImageUrl,
          description: action.payLoad.description,
          postedOn: action.payLoad.postedOn
        })
      };
    default:
      return state;
  }
};
