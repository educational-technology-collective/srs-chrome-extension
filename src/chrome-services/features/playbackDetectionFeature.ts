import {
  CourseraPlaybackLm,
  handleErrorNullElement,
  responseObject,
} from "../../types";
import {
  courseraPlaybackLmPoolMap,
  setCourseraPlaybackLmPoolMap,
} from "../states";
import { makeGetReqWithParam, makePostReq } from "../requests";

export const detectPlayback = () => {
  // Observe current timestamp.
  let timestampDetector: MutationObserver = createTimestampDetector();
  timestampDetector.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Listen to URL change and determine if it's a valid lecture URL.
  // If so, then get LMs for that lecture.
  chrome.runtime.onMessage.addListener(
    (
      request: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: responseObject) => void
    ) => {
      if (request.message === "url from service worker") {
        console.log(
          sender.tab
            ? "from a content script:" + sender.tab.url
            : "from an extension"
        );
        timestampDetector.disconnect();

        const url = request.data;
        const learnVideoUrlRegex =
          /^https:\/\/www.coursera.org\/learn\/siads505\/lecture\/.*$/;
        const teachVideoUrlRegex =
          /^https:\/\/www.coursera.org\/teach\/siads505\/.*\/lecture\/.*$/;

        // Check if url is valid.
        if (
          url &&
          (learnVideoUrlRegex.test(url) || teachVideoUrlRegex.test(url))
        ) {
          timestampDetector = createTimestampDetector();
          timestampDetector.observe(document.body, {
            childList: true,
            subtree: true,
          });

          // Get LMs.
          makeGetReqWithParam("/lms/search", [
            ["videoUrl", window.location.toString()],
          ]).then((res) => {
            // Convert VideoLm[] to Object for constant-time lookup.
            // key = endTime, val = LM object
            const lmMap = new Map();
            res.forEach((lm: CourseraPlaybackLm) => {
              lmMap.set(lm.content.endTime, lm);
            });

            setCourseraPlaybackLmPoolMap(lmMap);
          });

          sendResponse({ message: "url is a lecture video" });
          return true;
        } else {
          sendResponse({ message: "url is not a lecture video" });
          return true;
        }
      }
    }
  );
};

// Creates a MutationObserver that detects timestamp.
// Timestamp is not loaded immediately, so we need to observe until it's rendered.
const createTimestampDetector = () => {
  const timestampDetector = new MutationObserver(() => {
    if (document.querySelector(".current-time-display")) {
      const timestamp = document.querySelector(".current-time-display");
      timestampDetector.disconnect();
      console.log("timestamp detected");

      // Observe timestamp change every second.
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

// Creates a timestamp observer that detects change in timestamp every second.
const createTimestampObserver = () => {
  const tc = createTimestampObserverCallback();
  const timestampObserver = new MutationObserver(tc);
  return timestampObserver;
};

// Callback function for timestampObserver.
const createTimestampObserverCallback = () => {
  const timestampObserverCallback: MutationCallback = (mutationList) => {
    const mutation = mutationList[0];
    const timestamp = mutation.target.textContent;

    if (timestamp && courseraPlaybackLmPoolMap.has(timestamp)) {
      console.log("lm at", timestamp);
      const lm_id = courseraPlaybackLmPoolMap.get(timestamp)?._id;
      if (lm_id) {
        const userEmail = window.localStorage.getItem("userEmail");

        // No need to await because it's not expecting a response.
        (async () => {
          const res = await chrome.runtime.sendMessage({
            message: "lm triggered from content script",
            data: { videoUrl: window.location.toString(), lm_id: lm_id },
          });
          console.log(res.message);
        })();

        makePostReq(`/${userEmail}/${lm_id}`, {});

        console.log("postreq is sent from playback", userEmail);
      }
    }
  };

  return timestampObserverCallback;
};
