import { getTrimmedTitle } from "../Utils/utils";
import "./VideoCard.css";
import { useData } from "../DataContext/DataContext";
import { deleteFromHistory } from "../ServerCalls/ServerCalls";
import { useNavigate } from "react-router-dom";

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
  // console.log("From file", file);
  const { history, DataDispatch } = useData();
  return (
    <div
      class="card-container"
      // onClick={() => DataDispatch({ type: ADD_TO_HISTORY, payLoad: data })}
      // onClick={() => addToHistoryHandler(data, history, DataDispatch)}
    >
      <div
        class="imageBox"
        onClick={() => navigate(`/video/${data._id}`, { state: history })}
      >
        <div class="imageInn">
          <img class="thumbnail" src={imageUrl} alt="thumbnail"></img>
        </div>
        <div class="hoverImg">
          <img src={hoverImageUrl} alt="animated"></img>
        </div>
        <div class="card__description">
          <div class="profile">
            <img class="dp" src={channelDp} alt="profile pic"></img>
          </div>
          <div class="info">
            <p
              class="info__title"
              onClick={() => navigate(`/video/${data._id}`, { state: history })}
            >
              {getTrimmedTitle(title)}
              {/* {data.title} */}
            </p>
            <div class="info__channel">
              <p>
                <small>{channelName}</small>
              </p>
              <p>
                <small>
                  {views} • {postedOn}
                </small>
              </p>
              <div className="delete">
                {fromFile === "history" && (
                  <i
                    class="fa fa-trash"
                    aria-hidden="true"
                    title={`delete from ${fromFile}`}
                    onClick={() =>
                      deleteFromHistory(_id, title, history, DataDispatch)
                    }
                  ></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
