import { useState, useEffect } from "react";
import { LandingPage, LogoutButton, LmPane, Pane2, FcPane, Profile } from "./components";
import { VideoLm } from "./types";
import { makeGetReqWithParam } from "./utils";
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/App.css";

function App() {
  const { isAuthenticated, user } = useAuth0();
  // we may need a state to track current url to trigger a full rerender.
  // this way the GET request will be sent again.
  const lmArray: VideoLm[] = [];
  const [arr, setArr] = useState(lmArray);

  const updateArr = (value: VideoLm[]) => {
    setArr(value);
  };

  useEffect(() => {
    // switch url to window.location.toString() in prod.
    makeGetReqWithParam("/lms/search", [
      ["videoUrl", "https://www.coursera.org/learn/python-data-analysis/lecture/Kgwr5/merging-dataframes"],
    ])
      .then((res) => {
        setArr(res);
        setIndex(0);
        // send message to the service worker, so that it can update the state in chrome-services directory.
        chrome.runtime.sendMessage({ message: "GET from App", data: res });
      })
      .catch((err) => {
        console.log("Error while fetching videoLM:", err);
      });
  }, []);

  // lmArray index handling.
  // this index is used to access specific elements of the lmArray.
  const [index, setIndex] = useState(-1);
  const handleIndex = (value: number) => {
    setIndex(value);
  };

  return (
    <>
      {!isAuthenticated ? (
        <div id="landingPage">
          <LandingPage />
        </div>
      ) : (
        // <div id="loginBtnContainer">
        //   <LoginButton />
        // </div>
        <>
          <div id="lmPane">
            <LmPane lmArray={arr} updateArr={updateArr} handleIndex={handleIndex} index={index} />
          </div>
          <div id="pane2">
            <Pane2 lmArray={arr} index={index} updateArr={updateArr} />
          </div>
          <div id="fcPane">
            <FcPane lmArray={arr} lmIndex={index} updateArr={updateArr} />
          </div>
          <Profile />
          <div id="pane4">
            <p>Welcone, {user?.name}.</p>
            <div id="spacer"></div>
            <LogoutButton />
          </div>
        </>
      )}
    </>
  );
}

export default App;
