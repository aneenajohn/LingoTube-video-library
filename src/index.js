import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { DataProvider } from "./components/DataContext/DataContext";
import { VideoProvider } from "./components/VideoList/videoContext";
import { AuthProvider } from "./components/Context/authProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <VideoProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </VideoProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  rootElement
);
