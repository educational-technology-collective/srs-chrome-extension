import { CourseraPlaybackLm } from "../../types";
import { courseraPlaybackLmPoolMap } from "../states";

// Compares two LM's timestamps.
// Returns true if t1 > t2, else returns false.
const compareLmTimestamp = (t1: string, t2: string) => {
  // convert time string to time
  const lm1TimeStrs = t1.split(":");

  let lm1StartTime = 0;
  if (lm1TimeStrs.length === 1) {
    // SS
    lm1StartTime = +lm1TimeStrs[0];
  } else if (lm1TimeStrs.length === 2) {
    // MM:SS
    lm1StartTime = +lm1TimeStrs[0] * 60 + +lm1TimeStrs[1];
  } else {
    // HH:MM:SS
    lm1StartTime =
      +lm1TimeStrs[0] * 60 * 60 + +lm1TimeStrs[1] * 60 + +lm1TimeStrs[2];
  }

  // convert time string to time
  const lm2TimeStrs = t2.split(":");

  let lm2StartTime = 0;
  if (lm2TimeStrs.length === 1) {
    // SS
    lm2StartTime = +lm2TimeStrs[0];
  } else if (lm2TimeStrs.length === 2) {
    // MM:SS
    lm2StartTime = +lm2TimeStrs[0] * 60 + +lm2TimeStrs[1];
  } else {
    // HH:MM:SS
    lm2StartTime =
      +lm2TimeStrs[0] * 60 * 60 + +lm2TimeStrs[1] * 60 + +lm2TimeStrs[2];
  }

  return lm1StartTime > lm2StartTime;
};

// Return an LM ID given a timestamp.
const getCourseraPlaybackLmId = (timestamp: string) => {
  let prevPair: [string | null, CourseraPlaybackLm | null] = [null, null];

  if (courseraPlaybackLmPoolMap) {
    courseraPlaybackLmPoolMap.forEach((v, k) => {
      // When k is first greater than timestamp
      if (compareLmTimestamp(k, timestamp)) {
        if (prevPair[1] != null) {
          return prevPair[1]._id;
        }
      }
      prevPair = [k, v];
    });
  }
};

export { compareLmTimestamp, getCourseraPlaybackLmId };
