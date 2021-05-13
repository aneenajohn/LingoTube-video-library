import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../BackendUrl";
import { useVideo } from "./videoContext";
import { Header } from "../Header/header";
import "./videoList.css";
import { getTrimmedTitle } from "../Utils/utils";
export function VideoList() {
  const [videos, setVideos] = useState([]);
  const { dispatch: videoDispatch, language } = useVideo();
  useEffect(() => {
    (async function getVideoList() {
      const {
        data: { videos }
      } = await axios.get(`${BACKEND_URL}videos`);
      // console.log(data);
      setVideos(videos);
      console.log("videos", videos);
    })();
  }, []);

  function getfilteredData(videoList, language) {
    switch (language) {
      case "en":
        return videoList.filter((video) => video.language === "en");
      case "es":
        return videoList.filter((video) => video.language === "es");
      case "ta":
        return videoList.filter((video) => video.language === "ta");
      case "hi":
        return videoList.filter((video) => video.language === "hi");
      case "de":
        return videoList.filter((video) => video.language === "de");
      case "All":
        return videoList;
      default:
        return videoList;
    }
  }

  const filteredData = getfilteredData(videos, language);
  console.log("filtered data", filteredData);
  return (
    <section id="page">
      <Header />
      <main class="main">
        <div class="main__components">
          <div class="components">
            <div class="lang-pills">
              <button
                class="btn-pill btn-pill--primary "
                onClick={() =>
                  videoDispatch({ type: "LANGUAGE", payLoad: "All" })
                }
              >
                All
              </button>
              <button
                class="btn-pill
             btn-pill--primary "
                onClick={() =>
                  videoDispatch({ type: "LANGUAGE", payLoad: "en" })
                }
              >
                English
              </button>
              <button
                class="btn-pill btn-pill--primary"
                onClick={() =>
                  videoDispatch({ type: "LANGUAGE", payLoad: "es" })
                }
              >
                Spanish
              </button>
              <button
                class="btn-pill btn-pill--primary "
                onClick={() =>
                  videoDispatch({ type: "LANGUAGE", payLoad: "ta" })
                }
              >
                tamil
              </button>
              <button
                class="btn-pill btn-pill--primary "
                onClick={() =>
                  videoDispatch({ type: "LANGUAGE", payLoad: "hi" })
                }
              >
                Hindi
              </button>
              <button
                class="btn-pill btn-pill--primary "
                onClick={() =>
                  videoDispatch({ type: "LANGUAGE", payLoad: "de" })
                }
              >
                German
              </button>
            </div>

            {videos.length === 0 ? (
              <div>Loading....</div>
            ) : (
              <div className="container">
                {filteredData.map((data) => (
                  <div class="card-container">
                    <div class="imageBox">
                      <div class="imageInn">
                        <img
                          class="thumbnail"
                          src={data.imageUrl}
                          alt="thumbnail"
                        ></img>
                      </div>
                      <div class="hoverImg">
                        <img src={data.hoverImageUrl} alt="animated"></img>
                      </div>
                      <div class="card__description">
                        <div class="profile">
                          <img
                            class="dp"
                            src={data.channelDp}
                            alt="profile pic"
                          ></img>
                        </div>
                        <div class="info">
                          <p class="info__title">
                            {getTrimmedTitle(data.title)}
                            {/* {data.title} */}
                          </p>
                          <div class="info__channel">
                            <p>
                              <small>{data.channelName}</small>
                            </p>
                            <p>
                              <small>
                                {data.views} • {data.postedOn}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}
