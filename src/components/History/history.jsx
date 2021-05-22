import { useData } from "../DataContext/DataContext";
import { Header } from "../Header/header";
import { VideoCard } from "../VideoCard/VideoCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const History = () => {
  const { history } = useData();
  const fromFile = "history";

  console.log("history in history route", history);
  return (
    <section id="page">
      <Header />
      <main class="main">
        <h1 className="section-title">Watch history</h1>
        <div class="main__components">
          {history.length === 0 ? (
            <h3 className="para-lead">
              Hey Polyglots,Start watching our handpicked videos!!
            </h3>
          ) : (
            <>
              <div class="container">
                {history.map((data) => (
                  <li key={data._id}>
                    {<VideoCard data={data} fromFile={fromFile} />}
                  </li>
                ))}
              </div>
              <ToastContainer />
            </>
          )}
        </div>
      </main>
    </section>
  );
};
