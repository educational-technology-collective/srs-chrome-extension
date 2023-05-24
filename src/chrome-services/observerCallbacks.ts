import { handleErrorNullElement, TimeSegDatum } from "../types";

// callback function for transcriptObserver
// checks if the rc-Phrase div has "active" class and prints the phrase content if so
export function createTranscriptObserverCallback(timeSegData: TimeSegDatum[], fullTranscript: string[]) {
  const transcriptObserverCallback: MutationCallback = (mutationList) => {
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
