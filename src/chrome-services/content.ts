import { TimeSegDatum, IvqDatum } from "../types/LoggingDataTypes";

const API_ENDPOINT = "https://fqtje2wqfl.execute-api.us-east-1.amazonaws.com/default/test";

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

// callback function for transcriptObserver
// checks if the rc-Phrase div has "active" class
// and prints the phrase content if so.
const transcriptCallback: MutationCallback = (mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === "attributes") {
      if (mutation.attributeName === "class") {
        // casting to Element is ok, as mutation type is "attributes" and thus mutation.target will always return an Element type.
        // this is a workaround because TypeScript thinks mutation.target is always of type Node even after the check.
        const transcriptElement = <Element>mutation.target;
        const isActive = transcriptElement.classList.contains("active");
        if (isActive) {
          console.log(`${mutation.attributeName} modified`);

          const segmentElement = transcriptElement.querySelector("span");
          let segment = "";
          if (segmentElement) {
            segment = segmentElement.innerHTML;
            console.log(segment);
          } else {
            console.log("error: segmentElement is null");
          }

          const timestampElement = document.querySelector(".current-time-display");
          let timestamp = "";
          if (timestampElement) {
            timestamp = timestampElement.innerHTML;
            console.log(timestamp);
          } else {
            console.log("error: timestampElement is null");
          }

          timeSegData.push({ timestamp: timestamp, segment: segment });
          console.log(timeSegData);

          fullTranscript += segment;
          console.log(fullTranscript);
        }
      }
    }
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

// global observer to detect transcript load
// this allows us to wait until the transcript is loaded in the DOM.
const transcriptDetector = new MutationObserver(() => {
  if (document.querySelector(".rc-Transcript")) {
    const transcript = document.querySelector(".rc-Transcript");
    transcriptDetector.disconnect();
    console.log("transcript detected");

    // observes the loaded transcript for highlighted phrases
    const transcriptObserver = new MutationObserver(transcriptCallback);
    if (transcript) {
      transcriptObserver.observe(transcript, {
        attributes: true,
        subtree: true,
      });
    } else {
      console.log("error: transcript is null");
    }
  }
});

// global observer to detect video
// this allows us to track video progress to see when it's done.
const videoDetector = new MutationObserver(() => {
  if (document.querySelector("#video_player")) {
    const video = document.querySelector("#video_player");
    videoDetector.disconnect();
    console.log("video detected");

    // observe the video to detect playback end
    const videoObserver = new MutationObserver(videoCallback);
    if (video) {
      videoObserver.observe(video, {
        attributes: true,
      });
    } else {
      console.log("error: video is null");
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
        console.log("error: ivqQuestion is null");
      }
    } else {
      console.log("error: ivqQuestionElement is null");
    }

    // get ivq answer choices
    const ivqAnswersHtml = document.querySelectorAll(".rc-Option__input-text");
    const ivqAnswers: string[] = [];
    ivqAnswersHtml.forEach((ivqAnswer) => {
      if (ivqAnswer.textContent) {
        ivqAnswers.push(ivqAnswer.textContent);
      } else {
        console.log("error: ivqAnswer is null");
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

// console.log(chrome.tabs)
// chrome.tabs.onUpdated.addEventListener((tabId, changeInfo, tab) => {
//     console.log(tabId, changeInfo, tab);
// });

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

// on initial load of the page
console.log("extension loaded");

const timeSegData: TimeSegDatum[] = [];
const ivqData: IvqDatum[] = [];
let fullTranscript = "";
