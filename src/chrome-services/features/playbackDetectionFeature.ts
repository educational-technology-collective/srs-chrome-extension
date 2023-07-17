import { handleErrorNullElement, playbackDatum, VideoLm } from "../../types";
import { lmPoolMap, setLmPoolMap, userEmail } from "../states";
import { makeGetReqWithParam, makePostReq } from "../requests";

export const detectPlayback = () => {
  let timestampDetector = createTimestampDetector();
  timestampDetector.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // get LMs
  makeGetReqWithParam("/lms/search", [["videoUrl", window.location.toString()]]).then((res) => {
    // convert VideoLm[] to Object for constant-time lookup
    // key = endTime, val = LM object
    const lmMap = new Map();
    res.forEach((lm: VideoLm) => {
      lmMap.set(lm.endTime, lm);
    });

    setLmPoolMap(lmMap);
  });

  // Chrome message passing API.
  chrome.runtime.onMessage.addListener((request: any) => {
    timestampDetector.disconnect();

    const url = request.message;
    const videoUrlRegex = /^https:\/\/www.coursera.org\/learn\/.*\/lecture\/.*$/;

    // check if url is a video.
    if (url && videoUrlRegex.test(url)) {
      console.log("url from ts", url);
    }

    timestampDetector = createTimestampDetector();
    timestampDetector.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // get LMs
    makeGetReqWithParam("/lms/search", [["videoUrl", window.location.toString()]]).then((res) => {
      // convert VideoLm[] to Object for constant-time lookup
      // key = endTime, val = LM object
      const lmMap = new Map();
      res.forEach((lm: VideoLm) => {
        lmMap.set(lm.endTime, lm);
      });

      setLmPoolMap(lmMap);
    });

    return true;
  });
};

// creates a MutationObserver that detects timestamp.
// timestamp is not loaded immediately, so we need to observe until it's rendered.
const createTimestampDetector = () => {
  const timestampDetector = new MutationObserver(() => {
    if (document.querySelector(".current-time-display")) {
      const timestamp = document.querySelector(".current-time-display");
      timestampDetector.disconnect();
      console.log("timestamp detected");

      // observe timestamp change every second.
      if (timestamp) {
        const timestampObserver = createTimestampObserver();
        timestampObserver.observe(timestamp, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      } else {
        handleErrorNullElement("timestamp");
      }
    }
  });

  return timestampDetector;
};

// creates a timestamp observer that detects change in timestamp every second.
const createTimestampObserver = () => {
  const tc = createTimestampObserverCallback();
  const timestampObserver = new MutationObserver(tc);
  return timestampObserver;
};

// callback function for timestampObserver.
const createTimestampObserverCallback = () => {
  const timestampObserverCallback: MutationCallback = (mutationList) => {
    const mutation = mutationList[0];
    const timestamp = mutation.target.textContent;

    if (timestamp && lmPoolMap.has(timestamp)) {
      console.log("lm at", timestamp);
      const lmId = lmPoolMap.get(timestamp)?._id;
      if (lmId) {
        const flashcardPayload = {
          lmId: lmId,
        };

        const telemetryPayload: playbackDatum = {
          userEmail: userEmail,
          lmId: lmId,
          timestamp: timestamp,
          videoUrl: window.location.toString(),
          type: "playback",
        };

        console.log("postreq is sent from playback");
        console.log("postreq is sent from playback", userEmail);

        chrome.runtime.sendMessage({ message: "numLms from content script" });
        makePostReq(`/users/${userEmail}/flashcards`, flashcardPayload);
        makePostReq("/telemetry/lms/playback", telemetryPayload);
      }
    }
  };

  return timestampObserverCallback;
};
