import { getTrimmedTitle } from "../Utils/utils";
import "./VideoCard.css";
import { useData } from "../DataContext/DataContext";
import { useNavigate } from "react-router-dom";
import { deleteHandler } from "../Utils/utils";
import { useAuth } from "../Context/authProvider";

export const VideoCard = ({ data, fromFile, playlistId, index }) => {
  const {
    _id,
    imageUrl,
    hoverImageUrl,
    channelDp,
    title,
    channelName,
    views,
    postedOn
  } = data;
  const navigate = useNavigate();
  const {
    authState: { userToken }
  } = useAuth();
  const { history, liked, DataDispatch } = useData();
  console.log({ index });
  console.log("token in video card", userToken);

  const cardClickHandler = (fromFile) => {
    switch (fromFile) {
      case "playlist":
        return navigate(`/playlist/${playlistId}/video/${data._id}`, {
          state: history
        });
      default:
        return navigate(`/video/${data._id}`, { state: history });
    }
  };

  return (
    <div className="card-container">
      <div
        className="imageBox"
        // onClick={() => navigate(`/video/${data._id}`, { state: history })}
        onClick={() => cardClickHandler(fromFile)}
      >
        <div className="imageInn">
          <img className="thumbnail" src={imageUrl} alt="thumbnail"></img>
        </div>
        <div className="hoverImg">
          <img src={hoverImageUrl} alt="animated"></img>
        </div>
      </div>
      <div className="card__description">
        <div className="profile">
          <img className="dp" src={channelDp} alt="profile pic"></img>
        </div>
        <div className="info">
          <p
            className="info__title"
            onClick={() => navigate(`/video/${data._id}`, { state: history })}
          >
            {getTrimmedTitle(title)}
            {/* {data.title} */}
          </p>
          <div className="info__channel">
            <p>
              <small>{channelName}</small>
            </p>
            <p>
              <small>
                {views} • {postedOn}
              </small>
            </p>
            <div className="delete">
              <i
                class="fa fa-trash"
                aria-hidden="true"
                title={`delete from ${fromFile}`}
                onClick={() =>
                  deleteHandler(
                    fromFile,
                    _id,
                    title,
                    history,
                    liked,
                    DataDispatch,
                    playlistId,
                    userToken
                  )
                }
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
