import { getTrimmedTitle } from "../Utils/utils";
import "./VideoCard.css";
import { useData } from "../DataContext/DataContext";
import { deleteFromHistory, deleteFromLiked } from "../ServerCalls/ServerCalls";
import { useNavigate } from "react-router-dom";
import { deleteHandler } from "../Utils/utils";

export const VideoCard = ({ data, fromFile }) => {
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

  const { history, liked, DataDispatch } = useData();

  const cardClickHandler = (fromFile) => {
    switch (fromFile) {
      case "playlist":
        return navigate(`/video/${data._id}`, { state: history });
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
                // onClick={() =>
                //   fromFile === "history"
                //     ? deleteFromHistory(_id, title, history, DataDispatch)
                //     : deleteFromLiked(_id, title, liked, DataDispatch)
                // }
                onClick={() =>
                  deleteHandler(
                    fromFile,
                    _id,
                    title,
                    history,
                    liked,
                    DataDispatch
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
