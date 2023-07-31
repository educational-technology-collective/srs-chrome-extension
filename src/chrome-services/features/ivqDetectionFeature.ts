import {
  handleErrorNullElement,
  requestObject,
  responseObject,
} from "../../types";
import { ivqData, setIvqData } from "../states";

export const detectIvq = () => {
  let ivqDetector = createIvqDetector();

  ivqDetector.observe(document.body, {
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
      ivqDetector.disconnect();

      const url = request.message;
      const videoUrlRegex =
        /^https:\/\/www.coursera.org\/learn\/.*\/lecture\/.*$/;

      // Check if url is a video.
      if (url && videoUrlRegex.test(url)) {
        // Reset detectors and pass in fresh, empty arrays to fill.
        setIvqData([]);

        ivqDetector = createIvqDetector();

        // Turn the new detectors on
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
    }
  };

  chrome.runtime.onMessage.addListener(listener);
};

// Creates a MutationObserver that detects Coursera's in-video quizzes.
const createIvqDetector = () => {
  const ivqDetector = new MutationObserver((mutationList) => {
    const mutation = mutationList[0];
    const addedNodeElement = <Element>mutation.addedNodes[0];

    if (
      addedNodeElement &&
      addedNodeElement.classList &&
      addedNodeElement.classList.contains("rc-VideoQuiz")
    ) {
      console.log("ivq found");

      // Get current timestamp.
      const timestampElement = document.querySelector(".current-time-display");
      let timestamp = "";

      if (timestampElement) {
        timestamp = timestampElement.innerHTML;
      }

      // Get ivq question.
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

      // Get ivq answer choices.
      const ivqAnswersHtml = document.querySelectorAll(
        ".rc-Option__input-text"
      );
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

      if (!ivqData.includes(ivqDatum, 0)) {
        ivqData.push(ivqDatum);
        console.log(ivqData);
      }
    }
  });

  return ivqDetector;
};
