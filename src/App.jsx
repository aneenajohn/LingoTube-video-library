import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { DataLoader } from "./components/DataLoader";
import { VideoList } from "./components/VideoList/videoList";
import { VideoPage } from "./components/VideoPage/VideoPage.jsx";
import { History } from "./components/History/history";
import { Liked } from "./components/Liked/liked";
import { Playlists } from "./components/Playlists/playlists";
import { PlaylistVideos } from "./components/Playlists/playlistVideos";
// import { Header } from "./components/Header/header";
// import { useVideo } from "./components/VideoList/videoContext";

export default function App() {
  return (
    <div className="App">
      {/* <h1 className="app-header">
        <Header />
      </h1> */}
      <DataLoader />
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/playlist" element={<Playlists />} />
        <Route path="/playlist/:playlistId" element={<PlaylistVideos />} />
        <Route
          path="/playlist/:playlistId/video/:videoId"
          element={<VideoPage />}
        />
      </Routes>
    </div>
  );
}
