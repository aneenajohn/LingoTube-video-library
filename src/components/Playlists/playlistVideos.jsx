import { Header } from "../Header/header";
import { VideoCard } from "../VideoCard/VideoCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useParams, useLocation } from "react-router-dom";

export const PlaylistVideos = () => {
  const { state } = useLocation();
  const { playlistName, videos, _id } = state;
  console.log("location", playlistName, videos, _id);
  const fromFile = "playlist";

  return (
    <section id="page">
      <Header />
      <main class="main">
        <h1 className="section-title">{playlistName}</h1>
        <div class="main__components">
          <div class="container">
            {videos.map((data) => (
              <li key={data._id}>
                {<VideoCard data={data} fromFile={fromFile} />}
              </li>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
};
