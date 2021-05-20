import { getTrimmedTitle } from "../Utils/utils";
import "./VideoThumbnailCard.css";

export const VideoThumbnailCard = ({ data }) => {
  const {
    imageUrl,
    hoverImageUrl,
    channelDp,
    title,
    channelName,
    views,
    postedOn
  } = data;

  return (
    <div class="card-container">
      <div class="imageBox">
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
            <p class="info__title">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
