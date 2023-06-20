import cs from "../courseData.json";
import { SegmentDatum } from "../../types";

// chunks transcript into managable pieces.
// use this to bypass ChatGPT's word limit.
export const chunkTranscript = async (chunkSize: number) => {
  let counter = 0;
  let chunk: SegmentDatum[] = [];
  cs.segmentData.forEach((element, index) => {
    if (counter == chunkSize || index == cs.segmentData.length - 1) {
      counter = 0;
      // console.log(chunk);
      chunk = [];
    }
    chunk.push(element);
    ++counter;
  });
};
