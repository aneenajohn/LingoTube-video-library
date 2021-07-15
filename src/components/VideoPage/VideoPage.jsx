import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Header } from "../Header/header";
import "./VideoPage.css";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { addToLiked } from "../ServerCalls/ServerCalls";
import { useData } from "../DataContext/DataContext";
import { isAddedInList, toggleActive } from "../Utils/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  CREATE_NEW_PLAYLIST,
  SET_PLAYLIST_CHOSEN,
  ADD_VIDEO_TO_PLAYLIST
} from "../Utils/constants";
import axios from "axios";
import { BACKEND_URL } from "../BackendUrl";
import { useAuth } from "../Context/authProvider";

export const VideoPage = () => {
  console.log("useParams", useParams());
  const { videoId } = useParams();
  const { state: data } = useLocation();
  console.log("location", data);
  console.log(videoId);
  const [isSelected, setSelected] = useState(false);
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
  const { liked, playlist, chosenPlaylist, DataDispatch } = useData();
  const [playlistTitle, setPlaylistTitle] = useState("");

  const playlistInputHandler = (event) => setPlaylistTitle(event.target.value);
  const {
    authState: { userToken }
  } = useAuth();

  const createPlaylistHandler = async (userToken) => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}playlist`,
        {
          playlistName: playlistTitle
        },
        {
          headers: {
            authorization: userToken
          }
        }
      );
      if (data.success) {
        playlistTitle &&
          DataDispatch({ type: CREATE_NEW_PLAYLIST, payLoad: playlistTitle });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addVideoToPlaylistHandler = async (playlistId, videoId, userToken) => {
    console.log("playlistId", playlistId, "videoId", videoId);
    try {
      toast.success(`Video is being added to playlist`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
      const { data } = await axios({
        method: "post",
        url: `${BACKEND_URL}playlist/${playlistId}/${videoId}`,
        headers: { authorization: userToken }
      });

      console.log("data posted in playlist", data);
      if (data.success) {
        DataDispatch({
          type: ADD_VIDEO_TO_PLAYLIST,
          payLoad: { playlistId, video }
        });
        toast.success(`Video added to playlist`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  console.log("playlist", playlist);
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
                          <ThumbUpAltIcon
                            fontSize="large"
                            cursor="pointer"
                            color="secondary"
                          />
                        ) : (
                          <ThumbUpAltOutlinedIcon
                            fontSize="large"
                            cursor="pointer"
                            onClick={() =>
                              addToLiked(video, liked, DataDispatch, userToken)
                            }
                          />
                        )}
                        <PlaylistAddIcon
                          fontSize="large"
                          cursor="pointer"
                          onClick={() => toggleActive(isSelected, setSelected)}
                        />
                      </div>
                    </div>
                    <div>{description}</div>
                  </div>
                  <div
                    id="modalid"
                    className={isSelected ? "modal active" : "modal"}
                  >
                    <div class="modal__content">
                      <span
                        class="close"
                        onClick={() => toggleActive(isSelected, setSelected)}
                      >
                        &times;
                      </span>
                      <h1 class="modal__text   modal__title">
                        Add to playlist
                      </h1>
                      <div class="modal__text">
                        {playlist &&
                          playlist?.map((item, index) => {
                            return (
                              <div>
                                <label>
                                  <input
                                    type="checkbox"
                                    onChange={() => {
                                      console.log("video Id in caller: ", _id);
                                      addVideoToPlaylistHandler(
                                        item._id,
                                        _id,
                                        userToken
                                      );
                                      DataDispatch({
                                        type: SET_PLAYLIST_CHOSEN,
                                        payLoad: item.playlistName
                                      });
                                    }}
                                    checked={
                                      chosenPlaylist &&
                                      chosenPlaylist === item?.playlistName
                                    }
                                  ></input>
                                  {item?.playlistName}
                                </label>
                                <br />
                              </div>
                            );
                          })}
                      </div>
                      <div className="newPlaylist">
                        <input
                          className="playlistName"
                          onChange={playlistInputHandler}
                          value={playlistTitle}
                        />
                        <i
                          class="fa fa-plus add"
                          aria-hidden="true"
                          onClick={() => createPlaylistHandler(userToken)}
                        ></i>
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
