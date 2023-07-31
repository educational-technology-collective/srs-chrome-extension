import {
  handleErrorNullElement,
  requestObject,
  responseObject,
} from "../../types";
import {
  segmentData,
  setSegmentData,
  setFullTranscript,
  concatFullTranscript,
} from "../states";

export const detectTranscript = () => {
  let transcriptDetector = createTranscriptDetector();

  transcriptDetector.observe(document.body, {
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
    if (request.message === "tab updated") {
      console.log("received:", request);
      console.log(
        sender.tab
          ? "from a content script:" + sender.tab.url
          : "from an extension"
      );

      // Disconnect any previously created detectors so that the browser can clean them up once we re-assign these below.
      // This also prevents observers from "stacking", which leads to multiple observes at once.
      transcriptDetector.disconnect();

      const url = request.message;
      const videoUrlRegex =
        /^https:\/\/www.coursera.org\/learn\/.*\/lecture\/.*$/;

      // Check if url is a video.
      if (url && videoUrlRegex.test(url)) {
        // Reset detectors and pass in fresh, empty arrays to fill.
        setSegmentData([]);
        setFullTranscript("");

        transcriptDetector = createTranscriptDetector();

        // Turn the new detectors on
        transcriptDetector.observe(document.body, {
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

// Creates a MutationObserver that detects transcript load.
// This allows us to wait until the transcript is loaded in the DOM.
const createTranscriptDetector = () => {
  const transcriptDetector = new MutationObserver(() => {
    if (document.querySelector(".rc-Transcript")) {
      const transcript = document.querySelector(".rc-Transcript");
      transcriptDetector.disconnect();
      console.log("transcript detected");

      // Observes the loaded transcript for highlighted phrases
      if (transcript) {
        const transcriptObserver = createTranscriptObserver();
        transcriptObserver.observe(transcript, {
          attributes: true,
          attributeFilter: ["class"],
          childList: true,
          subtree: true,
        });
      } else {
        handleErrorNullElement("transcript");
      }
    }
  });

  return transcriptDetector;
};

const createTranscriptObserver = () => {
  const tc = createTranscriptObserverCallback();
  const transcriptObserver = new MutationObserver(tc);
  return transcriptObserver;
};

// Callback function for transcriptObserver.
// Checks if the rc-Phrase div has "active" class and prints the phrase content if so.
const createTranscriptObserverCallback = () => {
  const transcriptObserverCallback: MutationCallback = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "class") {
          const transcriptElement = <Element>mutation.target;
          const isActive = transcriptElement.classList.contains("active");

          if (isActive) {
            const segmentElement = transcriptElement.querySelector("span");
            let segment = "";

            if (segmentElement) {
              segment = segmentElement.innerHTML;
            } else {
              handleErrorNullElement("segmentElement");
            }

            const timestampElement = document.querySelector(
              ".current-time-display"
            );
            let timestamp = "";

            if (timestampElement) {
              timestamp = timestampElement.innerHTML;
            } else {
              handleErrorNullElement("timestampElement");
            }

            segmentData.push({ timestamp: timestamp, segment: segment });

            concatFullTranscript(segment);
          }
        }
      }
    }
  };

  return transcriptObserverCallback;
};
