// import axios from "axios";
// import { useEffect } from "react";
// import { BACKEND_URL } from "./BackendUrl";
// import { useVideo } from "./VideoList/videoContext";

// export function DataLoader() {
//   const { dispatch: videoDispatch } = useVideo();
//   useEffect(() => {
//     (async function getVideoList() {
//       const { data } = await axios.get(`${BACKEND_URL}videos`);
//       console.log(data);
//       if (data.success) {
//         data.videos.map((video) =>
//           videoDispatch({ type: "ADD_TO_VIDEOLIST", payLoad: video })
//         );
//       }
//     })();
//   }, []);

//   return null;
// }
