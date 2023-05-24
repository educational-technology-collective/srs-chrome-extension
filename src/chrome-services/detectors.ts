import { handleErrorNullElement, TimeSegDatum } from "../types";
import { createTranscriptObserver } from "./observers";

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
