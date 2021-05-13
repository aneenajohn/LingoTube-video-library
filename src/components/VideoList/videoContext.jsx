import { createContext, useReducer, useContext } from "react";
import { videoReducer } from "./videoReducer";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, {
    playlist: [],
    language: "All"
  });

  return (
    <VideoContext.Provider
      value={{
        dispatch,
        playlist: state.playlist,
        language: state.language
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
