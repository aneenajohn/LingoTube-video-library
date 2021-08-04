import { Header } from "../Header/header";
import { useData } from "../DataContext/DataContext";
import "./playlists.css";
import "../VideoList/videoList.css";
import { useNavigate } from "react-router-dom";
import { deletePlaylistClicked } from "../ServerCalls/ServerCalls";
import { useAuth } from "../Context/authProvider";

export const Playlists = () => {
  const { playlist, DataDispatch } = useData();
  const fromFile = "playlist";
  console.log("playlist in playlist route", playlist);
  let navigate = useNavigate();
  const {
    authState: { userToken }
  } = useAuth();
  return (
    <section id="page">
      <Header />
      <main className="main">
        <h1 className="section-title">Playlists</h1>
        <div className="container playlist">
          {playlist.map((item) => {
            return (
              <div
                key={item?._id}
                className="card-container playlists"
                // onClick={() =>
                //   navigate(`/playlist/${item._id}`, { state: item })
                // }
              >
                {item?.videos?.length ? (
                  <div
                    className="imageBox"
                    onClick={() =>
                      navigate(`/playlist/${item._id}`, { state: item })
                    }
                  >
                    <div className="imageInn">
                      <img
                        className="thumbnail"
                        src={item?.videos[0]?.imageUrl}
                        alt="thumbnail"
                      ></img>
                      <div className="hoverImg playlist-hover     ">
                        <svg
                          viewBox="0 0 24 24"
                          preserveAspectRatio="xMidYMid meet"
                          focusable="false"
                          className="style-scope yt-icon play-icon"
                        >
                          <g class="style-scope yt-icon">
                            <path
                              d="M8 5v14l11-7z"
                              class="style-scope yt-icon"
                            ></path>
                          </g>
                        </svg>
                        <p>PLAY ALL</p>
                      </div>
                      <div className="thumbnail-overlay-side-panel">
                        <p className="playlist-overlay">{item.videos.length}</p>
                        <svg
                          viewBox="0 0 24 24"
                          preserveAspectRatio="xMidYMid meet"
                          focusable="false"
                          className="style-scope yt-icon playlist-icon playlist-overlay"
                        >
                          <g className="style-scope yt-icon">
                            <path
                              d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"
                              class="style-scope yt-icon"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : null}
                {item?.videos?.length ? (
                  <div className="card_detail">
                    <div
                      className="card__description playlistName"
                      onClick={() =>
                        navigate(`/playlist/${item._id}`, { state: item })
                      }
                    >
                      <p>
                        <strong>{item.playlistName}</strong>
                      </p>
                    </div>
                    <i
                      class="fa fa-trash remove-playlist"
                      aria-hidden="true"
                      // title={`delete from ${fromFile}`}
                      onClick={() =>
                        deletePlaylistClicked(
                          item._id,
                          item.playlistName,
                          DataDispatch,
                          userToken
                        )
                      }
                    ></i>
                  </div>
                ) : (
                  <div>
                    <h3 className="para--lead">
                      <strong disabled>{item?.playlistName}</strong>
                    </h3>
                    <h5 className="para">
                      {" "}
                      There is no video in this playlist.
                    </h5>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </section>
  );
};

// onClick={() =>
//   deleteHandler(
//     fromFile,
//     _id,
//     title,
//     history,
//     liked,
//     DataDispatch,
//     playlistId,
//     userToken
//   )
// }
