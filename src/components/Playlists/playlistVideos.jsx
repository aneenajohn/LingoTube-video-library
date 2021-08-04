import { Header } from "../Header/header";
import { VideoCard } from "../VideoCard/VideoCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useParams, useLocation } from "react-router-dom";
// import { playlist } from "../Utils/constants";
import { useData } from "../DataContext/DataContext";

export const PlaylistVideos = () => {
  const { state } = useLocation();
  const { playlistName, _id: playlistId } = state;
  // console.log("location", playlistName, videos, playlistId);
  const fromFile = "playlist";
  const { playlist } = useData();
  const playlistFound = playlist.find((item) => item._id === playlistId);
  console.log("yyyyyyy", playlistFound);
  const filteredVideos = playlistFound?.videos;

  return (
    <section id="page">
      <Header />
      <main class="main">
        <h1 className="section-title">{playlistName}</h1>
        <div class="main__components">
          <div class="container">
            {filteredVideos.reverse().map((data, index) => (
              <li key={data._id}>
                {
                  <VideoCard
                    data={data}
                    fromFile={fromFile}
                    playlistId={playlistId}
                    index={index}
                  />
                }
              </li>
            ))}
          </div>
        </div>
        <ToastContainer />
      </main>
    </section>
  );
};
