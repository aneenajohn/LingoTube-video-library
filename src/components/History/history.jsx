import { useData } from "../DataContext/DataContext";
import { Header } from "../Header/header";
import { VideoCard } from "../VideoCard/VideoCard";

export const History = () => {
  const { history } = useData();
  const fromFile = "history";

  console.log("history in history route", history);
  return (
    <section id="page">
      <Header />
      <main class="main">
        {history.length === 0 ? (
          <p className="para-lead">Hey Polyglots,Enjoy our streaming...</p>
        ) : (
          <div class="container">
            {/* <div class="components"> */}
            {history.map((data) => (
              <li
                key={data._id}
                // onClick={() =>
                //   navigate(`/video/${data._id}`, { state: history })
                // }
              >
                {<VideoCard data={data} fromFile={fromFile} />}
              </li>
            ))}
            {/* </div> */}
          </div>
        )}
      </main>
    </section>
  );
};
