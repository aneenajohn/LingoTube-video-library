import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { DataLoader } from "./components/DataLoader";
import { VideoList } from "./components/VideoList/videoList";
import { VideoPage } from "./components/VideoPage/VideoPage.jsx";
import { History } from "./components/History/history";
import { Liked } from "./components/Liked/liked";
import { Playlists } from "./components/Playlists/playlists";
import { PlaylistVideos } from "./components/Playlists/playlistVideos";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Signup/Signup";
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
        <PrivateRoute path="/history" element={<History />} />
        <PrivateRoute path="/liked" element={<Liked />} />
        <PrivateRoute path="/playlist" element={<Playlists />} />
        <PrivateRoute
          path="/playlist/:playlistId"
          element={<PlaylistVideos />}
        />
        <PrivateRoute
          path="/playlist/:playlistId/video/:videoId"
          element={<VideoPage />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
