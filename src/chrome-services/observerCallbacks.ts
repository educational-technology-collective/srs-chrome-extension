import { handleErrorNullElement, TimeSegDatum } from "../types";

// callback function for transcriptObserver.
// checks if the rc-Phrase div has "active" class and prints the phrase content if so.
export function createTranscriptObserverCallback(timeSegData: TimeSegDatum[], fullTranscript: string[]) {
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
              console.log(segment);
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
            console.log(timeSegData);

            fullTranscript.push(segment);
            console.log(fullTranscript);
          }
        }
      }
    }
  };

  return transcriptObserverCallback;
}

// callback function for videoObserver.
// checks if the video is over and sets the state to true if so.
export function createVideoObserverCallback(
  timeSegData: TimeSegDatum[],
  fullTranscript: string[],
  makePostReq: (payload: object) => Promise<void>
) {
  const videoObserverCallback: MutationCallback = (mutationList, observer) => {
    const mutation = mutationList[0];
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
  };

  return videoObserverCallback;
}
