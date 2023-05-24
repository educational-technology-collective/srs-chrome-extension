import { TimeSegDatum, IvqDatum, handleErrorNullElement, requestObject, responseObject } from "../types";
import { createTranscriptDetector } from "./detectors";

const API_ENDPOINT = "https://fqtje2wqfl.execute-api.us-east-1.amazonaws.com/default/test";

// on initial load of the page
console.log("extension loaded");

let timeSegData: TimeSegDatum[] = [];
let ivqData: IvqDatum[] = [];
let fullTranscript: string[] = [];

const transcriptDetector = createTranscriptDetector(timeSegData, fullTranscript);

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

// generic POST request function
// we use this to make POST request to the AWS Lambda instance.
const makePostReq = async (payload: object) => {
  try {
    const resp = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// callback function for videoObserver
// checks if the video is over
// and sets the state to true if so.
const videoCallback: MutationCallback = (mutationList, observer) => {
  const mutation = mutationList[0];
  if (mutation.type === "attributes") {
    if (mutation.attributeName === "class") {
      // casting to Element is ok, as mutation type is "attributes" and thus mutation.target will always return an Element type.
      // this is a workaround because TypeScript thinks mutation.target is always of type Node even after the check.
      const videoElement = <Element>mutation.target;
      const isVideoDone = videoElement.classList.contains("vjs-ended");
      if (isVideoDone) {
        observer.disconnect();

        const vidLearningData = {
          fullTranscript: fullTranscript,
          timeSegData: timeSegData,
        };
        console.log(vidLearningData);

        makePostReq(vidLearningData);
      }
    }
  }
};

// global observer to detect video
// this allows us to track video progress to see when it's done.
const videoDetector = new MutationObserver(() => {
  if (document.querySelector(".rc-VideoMiniPlayer")) {
    const video = document.querySelector(".rc-VideoMiniPlayer");
    videoDetector.disconnect();
    console.log("video detected");

    // observe the video to detect playback end
    const videoObserver = new MutationObserver(videoCallback);
    if (video) {
      videoObserver.observe(video, {
        attributes: true,
        subtree: true,
      });
    } else {
      handleErrorNullElement("video");
    }
  }
});

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
