import { handleErrorNullElement, VideoLm } from "../../types";
import { lmPoolMap, setLmPoolMap } from "../states";
import { makeGetReq } from "../requests";

export const detectPlayback = () => {
  let timestampDetector = createTimestampDetector();
  timestampDetector.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Chrome message passing API.
  // listens to the pool of LMs passed by the service worker.
  const listener = (request: any) => {
    if (request.message === "lmPoolMap") {
      // save LM pool to state
      const m: Map<string, VideoLm> = new Map(Object.entries(request.data));
      setLmPoolMap(m);
    } else {
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
    }

    return true;
  };

  chrome.runtime.onMessage.addListener(listener);
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
      const id = lmPoolMap.get(timestamp)?._id;
      if (id) {
        makeGetReq("/event/lm", [
          ["lmId", id],
          ["userEmail", "srsdevteam@gmail.com"],
        ]);
      }
    }
  };

  return timestampObserverCallback;
};
