import { TimeSegDatum, IvqDatum, handleErrorNullElement, requestObject, responseObject } from "../types";
import { createTranscriptDetector, createVideoDetector } from "./detectors";
import { makePostReq } from "./requests";

// on initial load of the page
console.log("extension loaded");

let timeSegData: TimeSegDatum[] = [];
let ivqData: IvqDatum[] = [];
let fullTranscript: string[] = [];

const transcriptDetector = createTranscriptDetector(timeSegData, fullTranscript);
const videoDetector = createVideoDetector(timeSegData, fullTranscript, makePostReq);

// Chrome message passing API
// listens to message passed by the service worker
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
    subtree: true,
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

const ivqDetector = new MutationObserver(() => {
  if (document.querySelector(".rc-VideoQuiz")) {
    console.log("ivq found");
    ivqDetector.disconnect();

    // get current timestamp
    const timestampElement = document.querySelector(".current-time-display");
    let timestamp = "";
    if (timestampElement) {
      timestamp = timestampElement.innerHTML;
    }

    // get ivq question
    const ivqQuestionElement = document.querySelector(".rc-CML");
    let ivqQuestion = "";
    if (ivqQuestionElement) {
      if (ivqQuestionElement.textContent) {
        ivqQuestion = ivqQuestionElement.textContent;
      } else {
        handleErrorNullElement("ivqQuestion");
      }
    } else {
      handleErrorNullElement("ivqQuestionElement");
    }

    // get ivq answer choices
    const ivqAnswersHtml = document.querySelectorAll(".rc-Option__input-text");
    const ivqAnswers: string[] = [];
    ivqAnswersHtml.forEach((ivqAnswer) => {
      if (ivqAnswer.textContent) {
        ivqAnswers.push(ivqAnswer.textContent);
      } else {
        handleErrorNullElement("ivqAnswer");
      }
    });

    const ivqDatum = {
      timestamp: timestamp,
      question: ivqQuestion,
      answers: ivqAnswers,
    };

    ivqData.push(ivqDatum);
    console.log(ivqData);
  }
});

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
