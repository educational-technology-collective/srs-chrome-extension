import { TimeSegDatum, IvqDatum, requestObject, responseObject } from "../types";
import { createIvqDetector, createTranscriptDetector, createVideoDetector } from "./detectors";
import { makePostReq } from "./requests";

// on initial load of the page.
console.log("extension loaded");

let timeSegData: TimeSegDatum[] = [];
let ivqData: IvqDatum[] = [];
let fullTranscript: string[] = [];

const transcriptDetector = createTranscriptDetector(timeSegData, fullTranscript);
const videoDetector = createVideoDetector(timeSegData, fullTranscript, makePostReq);
const ivqDetector = createIvqDetector(ivqData);

transcriptDetector.observe(document.body, {
  childList: true,
  subtree: true,
});

videoDetector.observe(document.body, {
  childList: true,
});

ivqDetector.observe(document.body, {
  childList: true,
  subtree: true,
});

// Chrome message passing API.
// listens to message passed by the service worker.
const listener = (
  request: requestObject,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: responseObject) => void
) => {
  console.log("received:", request);
  console.log(sender.tab ? "from a content script:" + sender.tab.url : "from an extension");

  transcriptDetector.observe(document.body, {
    childList: true,
    subtree: true,
  });

  videoDetector.observe(document.body, {
    childList: true,
  });

  ivqDetector.observe(document.body, {
    childList: true,
    subtree: true,
  });

  timeSegData = [];
  ivqData = [];
  fullTranscript = [];

  sendResponse({ message: "bye" });
  return true;
};

chrome.runtime.onMessage.addListener(listener);
