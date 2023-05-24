import { handleErrorNullElement, TimeSegDatum } from "../types";
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
  makePostReq: (payload: object) => Promise<void>
) {
  const videoDetector = new MutationObserver(() => {
    if (document.querySelector(".rc-VideoMiniPlayer")) {
      const video = document.querySelector(".rc-VideoMiniPlayer");
      videoDetector.disconnect();
      console.log("video detected");

      // observe the video to detect playback end
      if (video) {
        const videoObserver = createVideoObserver(timeSegData, fullTranscript, makePostReq);
        videoObserver.observe(video, {
          attributes: true,
          subtree: true,
        });
      } else {
        handleErrorNullElement("video");
      }
    }
  });

  return videoDetector;
}
