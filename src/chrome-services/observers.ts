import { TimeSegDatum } from "../types";
import { createTranscriptObserverCallback } from "./observerCallbacks";

// creates transcript observer that detects change and writes to timeSegData and fullTranscript
export function createTranscriptObserver(timeSegData: TimeSegDatum[], fullTranscript: string[]) {
  const tc = createTranscriptObserverCallback(timeSegData, fullTranscript);
  const transcriptObserver = new MutationObserver(tc);
  return transcriptObserver;
}
