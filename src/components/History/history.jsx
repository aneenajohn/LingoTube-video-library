import { useData } from "../DataContext/DataContext";
import { Header } from "../Header/header";
import { VideoCard } from "../VideoCard/VideoCard";
import { ToastContainer } from "react-toastify";

export const History = () => {
  const { history } = useData();
  const fromFile = "history";

  console.log("history in history route", history);
  return (
    <section id="page">
      <Header />
      <main class="main">
        <div class="main__components">
          {history.length === 0 ? (
            <p className="para-lead">
              Hey Polyglots,Start watching our handpicked videos!!
            </p>
          ) : (
            <>
              <h1 className="section-title">Watch history</h1>
              <div class="container">
                {/* <div class="components"> */}
                {history.map((data) => (
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
