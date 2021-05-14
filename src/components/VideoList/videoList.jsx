import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../BackendUrl";
import { useVideo } from "./videoContext";
import { Header } from "../Header/header";
import "./videoList.css";
import { getTrimmedTitle, getfilteredData } from "../Utils/utils";
export function VideoList() {
  const [videos, setVideos] = useState([]);
  const { dispatch: videoDispatch, language } = useVideo();
  const [isLoading, setLoader] = useState(false);
  useEffect(() => {
    (async function getVideoList() {
      setLoader(true);
      const {
        data: { videos }
      } = await axios.get(`${BACKEND_URL}videos`);
      // console.log(data);
      setVideos(videos);
      console.log("videos", videos);
      setLoader(false);
    })();
  }, []);

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
            {isLoading ? (
              <div class="loader">
                <i class="fa fa-spinner fa-pulse fa-5x fa-fw spinner"></i>
              </div>
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
