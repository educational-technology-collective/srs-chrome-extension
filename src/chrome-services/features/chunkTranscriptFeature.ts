import cs from "../courseData.json";
import { TimeSegDatum } from "../../types";

// chunks transcript into managable pieces.
// use this to bypass ChatGPT's word limit.
export const chunkTranscript = async (chunkSize: number) => {
  let counter = 0;
  let chunk: TimeSegDatum[] = [];
  cs.timeSegData.forEach((element, index) => {
    if (counter == chunkSize || index == cs.timeSegData.length - 1) {
      counter = 0;
      console.log(chunk);
      chunk = [];
    }
    chunk.push(element);
    ++counter;
  });
};
