import { handleErrorNullElement, requestObject, responseObject } from "../types";
import { timeSegData, fullTranscript, setTimeSegData, setFullTranscript } from "./states";

export const detectTranscript = () => {
  let transcriptDetector = createTranscriptDetector();

  transcriptDetector.observe(document.body, {
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
    transcriptDetector.disconnect();

    const url = request.message;
    const videoUrlRegex = /^https:\/\/www.coursera.org\/learn\/.*\/lecture\/.*$/;

    // check if url is a video.
    if (url && videoUrlRegex.test(url)) {
      // reset detectors and pass in fresh, empty arrays to fill.
      setTimeSegData([]);
      setFullTranscript([]);

      transcriptDetector = createTranscriptDetector();

      // turn the new detectors on
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
  };

  chrome.runtime.onMessage.addListener(listener);
};

// creates a MutationObserver that detects transcript load.
// this allows us to wait until the transcript is loaded in the DOM.
const createTranscriptDetector = () => {
  const transcriptDetector = new MutationObserver(() => {
    if (document.querySelector(".rc-Transcript")) {
      const transcript = document.querySelector(".rc-Transcript");
      transcriptDetector.disconnect();
      console.log("transcript detected");

      // observes the loaded transcript for highlighted phrases
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

// callback function for transcriptObserver.
// checks if the rc-Phrase div has "active" class and prints the phrase content if so.
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
              // console.log(segment);
            } else {
              handleErrorNullElement("segmentElement");
            }

            const timestampElement = document.querySelector(".current-time-display");
            let timestamp = "";

            if (timestampElement) {
              timestamp = timestampElement.innerHTML;
              console.log(timestamp);
            } else {
              handleErrorNullElement("timestampElement");
            }

            timeSegData.push({ timestamp: timestamp, segment: segment });
            // console.log(timeSegData);

            fullTranscript.push(segment);
            console.log(fullTranscript);
          }
        }
      }
    }
  };

  return transcriptObserverCallback;
};
