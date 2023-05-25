import { handleErrorNullElement, TimeSegDatum, IvqDatum } from "../types";
import { createTranscriptObserver, createVideoObserver } from "./observers";

// creates a MutationObserver that detects transcript load.
// this allows us to wait until the transcript is loaded in the DOM.
export function createTranscriptDetector(timeSegData: TimeSegDatum[], fullTranscript: string[]) {
  const transcriptDetector = new MutationObserver(() => {
    if (document.querySelector(".rc-Transcript")) {
      const transcript = document.querySelector(".rc-Transcript");
      transcriptDetector.disconnect();
      console.log("transcript detected");

      // observes the loaded transcript for highlighted phrases
      if (transcript) {
        const transcriptObserver = createTranscriptObserver(timeSegData, fullTranscript);
        transcriptObserver.observe(transcript, {
          attributes: true,
          subtree: true,
        });
      } else {
        handleErrorNullElement("transcript");
      }
    }
  });

  return transcriptDetector;
}

// creates a MutationObserver that detects video end.
// this allows us to track video progress to see when it's done.
export function createVideoDetector(
  timeSegData: TimeSegDatum[],
  fullTranscript: string[],
  // ivqData: IvqDatum[],
  makePostReq: (payload: object) => Promise<void>
) {
  const videoDetector = new MutationObserver(() => {
    if (document.querySelector('[aria-label="Video Player"]')) {
      const video = document.querySelector('[aria-label="Video Player"]');
      videoDetector.disconnect();
      console.log("video detected");

      // observe the video to detect playback end
      if (video) {
        const videoObserver = createVideoObserver(timeSegData, fullTranscript, makePostReq);
        videoObserver.observe(video, {
          attributes: true,
          childList: true,
          subtree: true,
        });
      } else {
        handleErrorNullElement("video");
      }
    }
  });

  return videoDetector;
}

// creates a MutationObserver that detects Coursera's in-video quizzes.
export function createIvqDetector(ivqData: IvqDatum[]) {
  const ivqDetector = new MutationObserver((mutationList) => {
    const mutation = mutationList[0];

    // casting to Element is ok, as mutation type is "attributes" and thus mutation.target will always return an Element type.
    // this is a workaround because TypeScript thinks mutation.target is always of type Node even after the check.
    const addedNodeElement = <Element>mutation.addedNodes[0];

    if (document.querySelector(".rc-VideoQuiz") && addedNodeElement.classList.contains("rc-VideoQuiz")) {
      console.log("ivq found");

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

      if (!ivqData.includes(ivqDatum, 0)) {
        ivqData.push(ivqDatum);
        console.log(ivqData);
      }
    }
  });

  return ivqDetector;
}
