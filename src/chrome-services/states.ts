import { SegmentDatum, IvqDatum, CourseraPlaybackLm } from "../types";

let segmentData: SegmentDatum[] = [];
const setSegmentData = (value: SegmentDatum[]) => {
  segmentData = value;
};
const pushSegmentData = (value: SegmentDatum) => {
  segmentData.push(value);
};

let fullTranscript = "";
const setFullTranscript = (value: string) => {
  fullTranscript = value;
};
const concatFullTranscript = (value: string) => {
  fullTranscript += value;
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

let isMetadata = true;
const setIsMetadata = (value: boolean) => {
  isMetadata = value;
};

let courseraPlaybackLmPoolMap: Map<string, CourseraPlaybackLm>;
const setCourseraPlaybackLmPoolMap = (
  value: Map<string, CourseraPlaybackLm>
) => {
  courseraPlaybackLmPoolMap = new Map([...value]);
};

export { segmentData, setSegmentData, pushSegmentData };
export { fullTranscript, setFullTranscript, concatFullTranscript };
export { ivqData, setIvqData, pushIvqData };
export { prevTimestamp, setPrevTimestamp };
export { hasSeeked, setHasSeeked };
export { isMetadata, setIsMetadata };
export { courseraPlaybackLmPoolMap, setCourseraPlaybackLmPoolMap };
