import {
  handleErrorNullElement,
  PlayPauseDatum,
  SkipRewindDatum,
  requestObject,
  responseObject,
} from "../../types";
import {
  prevTimestamp,
  setPrevTimestamp,
  hasSeeked,
  setHasSeeked,
  segmentData,
  fullTranscript,
  setSegmentData,
  setFullTranscript,
  isMetadata,
  setIsMetadata,
} from "../states";
import { makePostReq } from "../requests";
import { getCourseraPlaybackLmId } from ".";

export const detectVideo = () => {
  let videoDetector = createVideoDetector();

  videoDetector.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Chrome message passing API.
  // Listens to message passed by the service worker.
  // Responds with a message telling whether a link is a video or not.
  const listener = (
    request: requestObject,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: responseObject) => void
  ) => {
    if (request.message === "url from service worker") {
      console.log("received:", request);
      console.log(
        sender.tab
          ? "from a content script:" + sender.tab.url
          : "from an extension"
      );

      // Disconnect any previously created detectors so that the browser can clean them up once we re-assign these below.
      // This also prevents observers from "stacking", which leads to multiple observes at once.
      videoDetector.disconnect();

      const url = request.message;
      const learnVideoUrlRegex =
        /^https:\/\/www.coursera.org\/learn\/siads505\/lecture\/.*$/;
      const teachVideoUrlRegex =
        /^https:\/\/www.coursera.org\/teach\/siads505\/.*\/lecture\/.*$/;

      // Check if url is a video.
      if (
        url &&
        (learnVideoUrlRegex.test(url) || teachVideoUrlRegex.test(url))
      ) {
        // Reset detectors and pass in fresh, empty arrays to fill.
        setSegmentData([]);
        setFullTranscript("");
        setIsMetadata(true);

        videoDetector = createVideoDetector();

        // Turn the new detectors on
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
    }
  };
  chrome.runtime.onMessage.addListener(listener);
};

// Creates a MutationObserver that detects video end.
// This allows us to track video progress to see when it's done.
const createVideoDetector = () => {
  const videoDetector = new MutationObserver(() => {
    if (document.querySelector('[aria-label="Video Player"]')) {
      const video = document.querySelector('[aria-label="Video Player"]');
      videoDetector.disconnect();
      console.log("video detected");

      // Observe the video to detect playback end
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

// Creates a video observer that detects video end and writes segmentData and fullTranscript to vidLearningData.
const createVideoObserver = () => {
  const vc = createVideoObserverCallback();
  const videoObserver = new MutationObserver(vc);
  return videoObserver;
};

// Callback function for videoObserver.
// Checks if the video is over and sets the state to true if so.
const createVideoObserverCallback = () => {
  const videoObserverCallback: MutationCallback = (mutationList) => {
    const mutation = mutationList[0];
    const videoElement = <Element>mutation.target;
    const isVideoPlaying = videoElement.classList.contains("vjs-playing");
    const isVideoPaused = videoElement.classList.contains("vjs-paused");
    const isVideoSeeking = videoElement.classList.contains("vjs-seeking");
    const isVideoDone = videoElement.classList.contains("vjs-ended");
    const isUserActive = videoElement.classList.contains("vjs-user-active");
    const videoUrl = window.location.toString();

    const timestampElement = document.querySelector(".current-time-display");
    let timestamp = "";

    if (timestampElement) {
      timestamp = timestampElement.innerHTML;
    } else {
      handleErrorNullElement("timestampElement");
    }

    if (isVideoSeeking) {
      setIsMetadata(false);

      // Saves the timestamp when the video started seeking.
      // If video seeks from timestamp A to B, this saves A, and marks as hasSeeked.
      // We rely on this information to determine whether the video has been seeked forward or backward (skipped or rewound).
      if (!hasSeeked) {
        setPrevTimestamp(timestamp);
        setHasSeeked(true);
      }
    }

    if (isVideoPlaying && isUserActive) {
      const ppd: PlayPauseDatum = {
        timestamp: timestamp,
        videoUrl: videoUrl,
        action: "play",
      };

      const ppdPayload = {
        userEmail: window.localStorage.getItem("userEmail"),
        lm_id: getCourseraPlaybackLmId(timestamp),
        type: "videoAction",
        content: ppd,
      };

      console.log("ppdPayload:", ppdPayload);
      makePostReq("/telemetry/lms", ppdPayload);

      // Handle seeking while video is playing.
      if (hasSeeked && isVideoSeeking) {
        setIsMetadata(false);

        if (prevTimestamp != timestamp) {
          setHasSeeked(false);

          const srd: SkipRewindDatum = {
            startTimestamp: prevTimestamp,
            endTimestamp: timestamp,
            videoUrl: videoUrl,
            action: "",
          };

          if (prevTimestamp <= timestamp) {
            srd.action = "skip";
          } else if (prevTimestamp > timestamp) {
            srd.action = "rewind";
          }

          const srdPayload = {
            userEmail: window.localStorage.getItem("userEmail"),
            lm_id: getCourseraPlaybackLmId(timestamp),
            type: "videoAction",
            content: srd,
          };

          setPrevTimestamp(timestamp);
          console.log("srdPayload:", srdPayload);
          makePostReq("/telemetry/lms", srdPayload);
        }
      }
    }

    if (isVideoPaused && isUserActive) {
      const ppd: PlayPauseDatum = {
        timestamp: timestamp,
        videoUrl: videoUrl,
        action: "pause",
      };

      const ppdPayload = {
        userEmail: window.localStorage.getItem("userEmail"),
        lm_id: getCourseraPlaybackLmId(timestamp),
        type: "videoAction",
        content: ppd,
      };

      console.log("ppdPayload:", ppdPayload);
      makePostReq("/telemetry/lms", ppdPayload);

      // Handle skipping while video is paused.
      if (hasSeeked && !isVideoSeeking) {
        setIsMetadata(false);
        setHasSeeked(false);

        const srd: SkipRewindDatum = {
          startTimestamp: prevTimestamp,
          endTimestamp: timestamp,
          videoUrl: videoUrl,
          action: "",
        };

        if (prevTimestamp <= timestamp) {
          srd.action = "skip";
        } else if (prevTimestamp > timestamp) {
          srd.action = "rewind";
        }

        const srdPayload = {
          userEmail: window.localStorage.getItem("userEmail"),
          lm_id: getCourseraPlaybackLmId(timestamp),
          type: "videoAction",
          content: srd,
        };

        console.log("srdPayload:", srdPayload);
        makePostReq("/telemetry/lms", srdPayload);
      }
    }

    if (isVideoDone) {
      if (isMetadata) {
        // No play/pause/skip/rewind, so it must be for metadata collection.
        setIsMetadata(false);
        const metadata = {
          fullTranscript: fullTranscript,
          segments: segmentData,
          videoUrl: videoUrl,
        };
        console.log("metadata:", metadata);
        makePostReq("/metadata/lms", metadata);
      }
    }
  };

  return videoObserverCallback;
};
