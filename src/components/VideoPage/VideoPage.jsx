import { useParams, useLocation } from "react-router-dom";
import { Header } from "../Header/header";
import "./VideoPage.css";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { addToLiked } from "../ServerCalls/ServerCalls";
import { useData } from "../DataContext/DataContext";
import { isAddedInList } from "../Utils/utils";
import { ToastContainer } from "react-toastify";

export const VideoPage = () => {
  const { videoId } = useParams();
  const { state: data } = useLocation();
  console.log("location", data);
  console.log(videoId);
  let video;
  if (data) {
    video = data.find((video) => video._id === videoId);
  }
  const {
    _id,
    title,
    language,
    videoEmbedUrl,
    duration,
    channelName,
    channelDp,
    imageUrl,
    hoverImageUrl,
    description,
    views,
    postedOn
  } = video;

  console.log("video", video);
  const { liked, DataDispatch } = useData();
  return (
    <section id="page">
      <Header />
      <main class="main">
        <div class="main__components">
          <div class="components">
            <div className="video-container">
              {data && (
                <div className="video-wrapper">
                  <iframe
                    className="video-player"
                    src={`${videoEmbedUrl}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="desc">
                    <div className="video-details">
                      <p className="para-lead title">
                        <strong>{title}</strong>
                      </p>
                      <div>
                        {views} • {postedOn}
                      </div>
                      <div className="icons">
                        {isAddedInList(_id, liked) ? (
                          <ThumbUpAltIcon fontSize="large" color="secondary" />
                        ) : (
                          <ThumbUpAltOutlinedIcon
                            fontSize="large"
                            onClick={() =>
                              addToLiked(video, liked, DataDispatch)
                            }
                          />
                        )}
                        <PlaylistAddIcon fontSize="large" />
                      </div>
                    </div>
                  </div>
                  <ToastContainer style={{ fontSize: "medium" }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
