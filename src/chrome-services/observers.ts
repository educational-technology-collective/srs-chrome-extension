import { TimeSegDatum } from "../types";
import { createTranscriptObserverCallback, createVideoObserverCallback } from "./observerCallbacks";

// creates a transcript observer that detects change and writes to timeSegData and fullTranscript.
export function createTranscriptObserver(timeSegData: TimeSegDatum[], fullTranscript: string[]) {
  const tc = createTranscriptObserverCallback(timeSegData, fullTranscript);
  const transcriptObserver = new MutationObserver(tc);
  return transcriptObserver;
}

// creates a video observer that detects video end and writes timeSegData and fullTranscript to vidLearningData.
export function createVideoObserver(
  timeSegData: TimeSegDatum[],
  fullTranscript: string[],
  makePostReq: (payload: object) => Promise<void>
) {
  const vc = createVideoObserverCallback(timeSegData, fullTranscript, makePostReq);
  const videoObserver = new MutationObserver(vc);
  return videoObserver;
}
