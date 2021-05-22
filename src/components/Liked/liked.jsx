import { useData } from "../DataContext/DataContext";
import { Header } from "../Header/header";
import { VideoCard } from "../VideoCard/VideoCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const Liked = () => {
  const { liked } = useData();
  const fromFile = "liked";
  console.log("liked in liked route", liked);

  return (
    <section id="page">
      <Header />
      <main class="main">
        <h1 className="section-title">Liked Videos</h1>
        <div class="main__components">
          {liked.length === 0 ? (
            <h3 className="para-lead">
              Seems like you haven't liked any videos yet!
            </h3>
          ) : (
            <>
              <div class="container">
                {/* <div class="components"> */}
                {liked.map((data) => (
                  <li key={data._id}>
                    {<VideoCard data={data} fromFile={fromFile} />}
                  </li>
                ))}
              </div>
              <ToastContainer style={{ fontSize: "medium" }} />
            </>
          )}
        </div>
      </main>
    </section>
  );
};
