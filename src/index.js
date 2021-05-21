import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { DataProvider } from "./components/DataContext/DataContext";
import { VideoProvider } from "./components/VideoList/videoContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <VideoProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </VideoProvider>
    </Router>
  </StrictMode>,
  rootElement
);
