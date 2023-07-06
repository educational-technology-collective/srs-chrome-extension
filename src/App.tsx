import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LandingPage, LogoutButton, LmPane, FcPane } from "./components";
import { VideoLm } from "./types";
import { makeGetReqWithParam } from "./utils";
import "./styles/App.css";

// sorts LMs by their start time.
const compareLm = (lm1: VideoLm, lm2: VideoLm) => {
  // convert time string to time
  const lm1TimeStrs = lm1.startTime.split(":");

  let lm1StartTime = 0;
  if (lm1TimeStrs.length === 1) {
    // SS
    lm1StartTime = +lm1TimeStrs[0];
  } else if (lm1TimeStrs.length === 2) {
    // MM:SS
    lm1StartTime = +lm1TimeStrs[0] * 60 + +lm1TimeStrs[1];
  } else {
    // HH:MM:SS
    lm1StartTime = +lm1TimeStrs[0] * 60 * 60 + +lm1TimeStrs[1] * 60 + +lm1TimeStrs[2];
  }

  // convert time string to time
  const lm2TimeStrs = lm2.startTime.split(":");

  let lm2StartTime = 0;
  if (lm2TimeStrs.length === 1) {
    // SS
    lm2StartTime = +lm2TimeStrs[0];
  } else if (lm2TimeStrs.length === 2) {
    // MM:SS
    lm2StartTime = +lm2TimeStrs[0] * 60 + +lm2TimeStrs[1];
  } else {
    // HH:MM:SS
    lm2StartTime = +lm2TimeStrs[0] * 60 * 60 + +lm2TimeStrs[1] * 60 + +lm2TimeStrs[2];
  }

  return lm1StartTime - lm2StartTime;
};

function App() {
  const { isAuthenticated, user } = useAuth0();
  // we may need a state to track current url to trigger a full rerender.
  // this way the GET request will be sent again.
  const lmArray: VideoLm[] = [];
  const [arr, setArr] = useState(lmArray);

  const updateArr = (value: VideoLm[]) => {
    // order of LMs is not guaranteed to be sorted, so we sort it.
    value.sort(compareLm);
    setArr(value);
  };

  useEffect(() => {
    // switch url to window.location.toString() in prod.
    makeGetReqWithParam("/lms/search", [
      ["videoUrl", "https://www.coursera.org/learn/python-data-analysis/lecture/Kgwr5/merging-dataframes"],
    ])
      .then((res) => {
        updateArr(res);
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
        <>
          <div id="leftEditor">
            <div id="lmPane">
              <LmPane lmArray={arr} updateArr={updateArr} handleIndex={handleIndex} index={index} />
            </div>
            <div id="fcPane">
              <FcPane lmArray={arr} lmIndex={index} updateArr={updateArr} />
            </div>
            <div id="authPane">
              <p>Welcone, {user?.name}.</p>
              <div id="spacer"></div>
              <LogoutButton />
            </div>
          </div>
          <div id="rightPreview"></div>
        </>
      )}
    </>
  );
}

export default App;
