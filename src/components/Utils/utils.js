import { deleteFromHistory, deleteFromLiked } from "../ServerCalls/ServerCalls";

export function getTrimmedTitle(title) {
  if (title.length > 30) {
    var trimmedTitle = title.substr(0, 25);
    trimmedTitle = trimmedTitle.concat("...");
    return trimmedTitle;
  } else return title;
}

export function getfilteredData(videoList, language) {
  switch (language) {
    case "en":
      return videoList.filter((video) => video.language === "en");
    case "es":
      return videoList.filter((video) => video.language === "es");
    case "ta":
      return videoList.filter((video) => video.language === "ta");
    case "hi":
      return videoList.filter((video) => video.language === "hi");
    case "de":
      return videoList.filter((video) => video.language === "de");
    case "All":
      return videoList;
    default:
      return videoList;
  }
}

export const isAddedInList = (_id, list) => {
  const itemFound = list.find((item) => item._id === _id);
  return itemFound;
};

export const toggleActive = (isSelected, setSelected) =>
  setSelected(!isSelected);

export const deleteHandler = (
  fromFile,
  _id,
  title,
  history,
  liked,
  DataDispatch
) => {
  switch (fromFile) {
    case "history":
      return deleteFromHistory(_id, title, history, DataDispatch);
    case "liked":
      return deleteFromLiked(_id, title, liked, DataDispatch);
    default:
      console.log("Not deleting anything");
  }
};
