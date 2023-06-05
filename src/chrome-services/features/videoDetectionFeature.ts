import { handleErrorNullElement, PlayPauseDatum, SkipRewindDatum, requestObject, responseObject } from "../../types";
import {
  prevTimestamp,
  setPrevTimestamp,
  hasSeeked,
  setHasSeeked,
  timeSegData,
  fullTranscript,
  setTimeSegData,
  setFullTranscript,
} from "../states";
import { makePostReqTest } from "../requests";

export const detectVideo = () => {
  let videoDetector = createVideoDetector();

  videoDetector.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Chrome message passing API.
  // listens to message passed by the service worker.
  // responds with a message telling whether a link is a video or not.
  const listener = (
    request: requestObject,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: responseObject) => void
  ) => {
    console.log("received:", request);
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from an extension");

    // disconnect any previously created detectors so that the browser can clean them up once we re-assign these below.
    // this also prevents observers from "stacking", which leads to multiple observes at once.
    videoDetector.disconnect();

    const url = request.message;
    const videoUrlRegex = /^https:\/\/www.coursera.org\/learn\/.*\/lecture\/.*$/;

    // check if url is a video.
    if (url && videoUrlRegex.test(url)) {
      // reset detectors and pass in fresh, empty arrays to fill.
      setTimeSegData([]);
      setFullTranscript("");

      videoDetector = createVideoDetector();

      // turn the new detectors on
      videoDetector.observe(document.body, {
        childList: true,
        subtree: true,
      });

      sendResponse({ message: "url is a lecture video" });
      return true;
    } else {
      sendResponse({ message: "url is not a lecture video" });
      return true;
    }
  };

  chrome.runtime.onMessage.addListener(listener);
};

// creates a MutationObserver that detects video end.
// this allows us to track video progress to see when it's done.
const createVideoDetector = () => {
  const videoDetector = new MutationObserver(() => {
    if (document.querySelector('[aria-label="Video Player"]')) {
      const video = document.querySelector('[aria-label="Video Player"]');
      videoDetector.disconnect();
      console.log("video detected");

      // observe the video to detect playback end
      if (video) {
        const videoObserver = createVideoObserver();
        videoObserver.observe(video, {
          attributes: true,
          attributeFilter: ["class"],
        });
      } else {
        handleErrorNullElement("video");
      }
    }
  });

  return videoDetector;
};

// creates a video observer that detects video end and writes timeSegData and fullTranscript to vidLearningData.
const createVideoObserver = () => {
  const vc = createVideoObserverCallback();
  const videoObserver = new MutationObserver(vc);
  return videoObserver;
};

// callback function for videoObserver.
// checks if the video is over and sets the state to true if so.
const createVideoObserverCallback = () => {
  const playPauseData: PlayPauseDatum[] = [];
  const skipRewindData: SkipRewindDatum[] = [];
  const videoObserverCallback: MutationCallback = (mutationList, observer) => {
    const mutation = mutationList[0];
    const videoElement = <Element>mutation.target;
    const isVideoPlaying = videoElement.classList.contains("vjs-playing");
    const isVideoPaused = videoElement.classList.contains("vjs-paused");
    const isVideoSeeking = videoElement.classList.contains("vjs-seeking");
    const isVideoDone = videoElement.classList.contains("vjs-ended");
    const isUserActive = videoElement.classList.contains("vjs-user-active");
    // const isUserInactive = videoElement.classList.contains("vjs-user-inactive");

    const timestampElement = document.querySelector(".current-time-display");
    let timestamp = "";

    if (timestampElement) {
      timestamp = timestampElement.innerHTML;
    } else {
      handleErrorNullElement("timestampElement");
    }

    // srd is created first, then modified by isVideoSeeking, isVideoPaused, and isVideoPlaying before being pushed into the skipRewindData array.
    // this is also why we can't move srd creation into isVideoSeeking - isVideoPaused and isVideoPlaying won't be able to access it.
    const srd: SkipRewindDatum = {
      prevTimestamp: "",
      timestamp: "",
      isSkipping: false,
      isRewinding: false,
      isPlay: false,
      isPause: false,
    };

    if (isVideoSeeking) {
      if (isVideoPlaying) {
        srd.isPlay = true;
      } else if (isVideoPaused) {
        srd.isPause = true;
      }

      // saves the timestamp when the video started seeking.
      // if video seeks from timestamp A to B, this saves A, and marks as hasSeeked.
      // isVideoPlaying and isVideoPaused rely on this information to determine whether the video has been seeked forward or backward (skipped or rewound).
      if (!hasSeeked) {
        setPrevTimestamp(timestamp);
        setHasSeeked(true);
      }
    }

    if (isVideoPlaying) {
      const ppd: PlayPauseDatum = { timestamp: timestamp, isPlay: true, isPause: false, isActive: false };
      if (isUserActive) {
        ppd.isActive = true;
      }

      // inserts only when there are no duplicates
      const isFound = playPauseData.some((element) => {
        if (
          element.timestamp === ppd.timestamp &&
          element.isPlay === ppd.isPlay &&
          element.isPause === ppd.isPause &&
          element.isActive === ppd.isActive
        ) {
          return true;
        }
        return false;
      });
      if (!isFound) {
        playPauseData.push(ppd);
      }

      // handle seeking while video is playing.
      if (hasSeeked && isVideoSeeking) {
        if (prevTimestamp != timestamp) {
          setHasSeeked(false);

          if (prevTimestamp < timestamp) {
            srd.isSkipping = true;
            srd.prevTimestamp = prevTimestamp;
            srd.timestamp = timestamp;
          } else if (prevTimestamp > timestamp) {
            srd.isRewinding = true;
            srd.prevTimestamp = prevTimestamp;
            srd.timestamp = timestamp;
          }

          setPrevTimestamp(timestamp);

          // inserts only when there are no duplicates
          const isFound = skipRewindData.some((element) => {
            if (
              element.prevTimestamp === srd.prevTimestamp &&
              element.timestamp === srd.timestamp &&
              element.isSkipping === srd.isSkipping &&
              element.isRewinding === srd.isRewinding &&
              element.isPlay === srd.isPlay &&
              element.isPause === srd.isPause
            ) {
              return true;
            }
            return false;
          });
          if (!isFound) {
            skipRewindData.push(srd);
          }
        }
      }
    }

    if (isVideoPaused) {
      const ppd: PlayPauseDatum = { timestamp: timestamp, isPlay: false, isPause: true, isActive: false };
      if (isUserActive) {
        ppd.isActive = true;
      }

      // inserts only when there are no duplicates
      const isFound = playPauseData.some((element) => {
        if (
          element.timestamp === ppd.timestamp &&
          element.isPlay === ppd.isPlay &&
          element.isPause === ppd.isPause &&
          element.isActive === ppd.isActive
        ) {
          return true;
        }
        return false;
      });
      if (!isFound) {
        playPauseData.push(ppd);
      }

      // handle skipping while video is paused.
      if (hasSeeked && !isVideoSeeking) {
        setHasSeeked(false);

        if (prevTimestamp < timestamp) {
          srd.isSkipping = true;
          srd.prevTimestamp = prevTimestamp;
          srd.timestamp = timestamp;
        } else if (prevTimestamp > timestamp) {
          srd.isRewinding = true;
          srd.prevTimestamp = prevTimestamp;
          srd.timestamp = timestamp;
        }

        // inserts only when there are no duplicates
        const isFound = skipRewindData.some((element) => {
          if (
            element.prevTimestamp === srd.prevTimestamp &&
            element.timestamp === srd.timestamp &&
            element.isSkipping === srd.isSkipping &&
            element.isRewinding === srd.isRewinding &&
            element.isPlay === srd.isPlay &&
            element.isPause === srd.isPause
          ) {
            return true;
          }
          return false;
        });
        if (!isFound) {
          skipRewindData.push(srd);
        }
      }
    }

    if (isVideoDone) {
      observer.disconnect();

      const vidLearningData = {
        fullTranscript: fullTranscript,
        timeSegData: timeSegData,
        playPauseData: playPauseData,
        skipRewindData: skipRewindData,
      };
      console.log(vidLearningData);

      makePostReqTest(vidLearningData);
    }
  };

  return videoObserverCallback;
};
