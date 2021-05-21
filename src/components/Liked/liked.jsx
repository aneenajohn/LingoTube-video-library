import { useData } from "../DataContext/DataContext";
import { Header } from "../Header/header";
import { VideoCard } from "../VideoCard/VideoCard";
import { ToastContainer } from "react-toastify";

export const Liked = () => {
  const { liked } = useData();
  const fromFile = "liked";
  console.log("liked in liked route", liked);

  return (
    <section id="page">
      <Header />
      <main class="main">
        <div class="main__components">
          {liked.length === 0 ? (
            <p className="para-lead">
              Seems like you haven't liked any videos yet!
            </p>
          ) : (
            <>
              <h1 className="section-title">Liked Videos</h1>
              <div class="container">
                {/* <div class="components"> */}
                {liked.map((data) => (
                  <li key={data._id}>
                    {<VideoCard data={data} fromFile={fromFile} />}
                  </li>
                ))}
              </div>
            </>
          )}
        </div>
        <ToastContainer style={{ fontSize: "medium" }} />
      </main>
    </section>
  );
};
