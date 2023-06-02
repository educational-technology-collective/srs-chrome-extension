import { TimeSegDatum, IvqDatum } from "../types";

let timeSegData: TimeSegDatum[] = [];
const setTimeSegData = (value: TimeSegDatum[]) => {
  timeSegData = value;
};
const pushTimeSegData = (value: TimeSegDatum) => {
  timeSegData.push(value);
};

let fullTranscript: string[] = [];
const setFullTranscript = (value: string[]) => {
  fullTranscript = value;
};
const pushFullTranscript = (value: string) => {
  fullTranscript.push(value);
};

let ivqData: IvqDatum[] = [];
const setIvqData = (value: IvqDatum[]) => {
  ivqData = value;
};
const pushIvqData = (value: IvqDatum) => {
  ivqData.push(value);
};

let prevTimestamp = "";
const setPrevTimestamp = (value: string) => {
  prevTimestamp = value;
};

let hasSeeked = false;
const setHasSeeked = (value: boolean) => {
  hasSeeked = value;
};

export { timeSegData, setTimeSegData, pushTimeSegData };
export { fullTranscript, setFullTranscript, pushFullTranscript };
export { ivqData, setIvqData, pushIvqData };
export { prevTimestamp, setPrevTimestamp };
export { hasSeeked, setHasSeeked };
