import cs from "../courseStructure.json";
import { TimeSegDatum } from "../../types";

// chunks transcript into managable pieces.
// use this to bypass ChatGPT's word limit.
export const chunkTranscript = async (chunkSize: number) => {
  let counter = 0;
  let chunk: TimeSegDatum[] = [];
  cs.videoStructure.forEach((element) => {
    if (counter == chunkSize) {
      counter = 0;
      console.log(chunk);
      chunk = [];
    }
    chunk.push(element);
    ++counter;
  });
};
