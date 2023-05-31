import { TimeSegDatum, IvqDatum, requestObject, responseObject } from "../types";
import { createTranscriptDetector, createVideoDetector, createIvqDetector } from "./detectors";
import { makePostReq } from "./requests";
import { detectCopy, detectPaste } from "./copyPasteDetectionFeature";

// on initial load of the page.
console.log("extension loaded");

// add new features here.
detectCopy();
detectPaste();

let timeSegData: TimeSegDatum[] = [];
let ivqData: IvqDatum[] = [];
let fullTranscript: string[] = [];

let transcriptDetector = createTranscriptDetector(timeSegData, fullTranscript);
let videoDetector = createVideoDetector(timeSegData, fullTranscript, makePostReq);
let ivqDetector = createIvqDetector(ivqData);

transcriptDetector.observe(document.body, {
  childList: true,
  subtree: true,
});

videoDetector.observe(document.body, {
  childList: true,
  subtree: true,
});

ivqDetector.observe(document.body, {
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
  videoDetector.disconnect();
  ivqDetector.disconnect();

  const url = request.message;
  const videoUrlRegex = /^https:\/\/www.coursera.org\/learn\/.*\/lecture\/.*$/;

  // check if url is a video.
  if (url && videoUrlRegex.test(url)) {
    // reset detectors and pass in fresh, empty arrays to fill.
    timeSegData = [];
    ivqData = [];
    fullTranscript = [];

    transcriptDetector = createTranscriptDetector(timeSegData, fullTranscript);
    videoDetector = createVideoDetector(timeSegData, fullTranscript, makePostReq);
    ivqDetector = createIvqDetector(ivqData);

    // turn the new detectors on
    transcriptDetector.observe(document.body, {
      childList: true,
      subtree: true,
    });

    videoDetector.observe(document.body, {
      childList: true,
      subtree: true,
    });

    ivqDetector.observe(document.body, {
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
