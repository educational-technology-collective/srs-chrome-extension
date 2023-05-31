import { handleErrorNullElement, TimeSegDatum, PlayPauseDatum, SkipRewindDatum } from "../types";
import { prevTimestamp, setPrevTimestamp, hasSeeked, setHasSeeked } from "./states";

// callback function for transcriptObserver.
// checks if the rc-Phrase div has "active" class and prints the phrase content if so.
export function createTranscriptObserverCallback(timeSegData: TimeSegDatum[], fullTranscript: string[]) {
  const transcriptObserverCallback: MutationCallback = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "class") {
          const transcriptElement = <Element>mutation.target;
          const isActive = transcriptElement.classList.contains("active");

          if (isActive) {
            const segmentElement = transcriptElement.querySelector("span");
            let segment = "";

            if (segmentElement) {
              segment = segmentElement.innerHTML;
              // console.log(segment);
            } else {
              handleErrorNullElement("segmentElement");
            }

            const timestampElement = document.querySelector(".current-time-display");
            let timestamp = "";

            if (timestampElement) {
              timestamp = timestampElement.innerHTML;
              // console.log(timestamp);
            } else {
              handleErrorNullElement("timestampElement");
            }

            timeSegData.push({ timestamp: timestamp, segment: segment });
            // console.log(timeSegData);

            fullTranscript.push(segment);
            // console.log(fullTranscript);
          }
        }
      }
    }
  };

  return transcriptObserverCallback;
}

// callback function for videoObserver.
// checks if the video is over and sets the state to true if so.
export function createVideoObserverCallback(
  timeSegData: TimeSegDatum[],
  fullTranscript: string[],
  makePostReq: (payload: object) => Promise<void>
) {
  const playPauseData: PlayPauseDatum[] = [];
  const skipRewindData: SkipRewindDatum[] = [];
  const videoObserverCallback: MutationCallback = (mutationList, observer) => {
    const mutation = mutationList[0];
    const videoElement = <Element>mutation.target;
    const isVideoPlaying = videoElement.classList.contains("vjs-playing");
    const isVideoPaused = videoElement.classList.contains("vjs-paused");
    const isVideoSeeking = videoElement.classList.contains("vjs-seeking");
    const isVideoDone = videoElement.classList.contains("vjs-ended");
    const isUserActive = videoElement.classList.contains("vjs-user-active");
    // const isUserInactive = videoElement.classList.contains("vjs-user-inactive");

    const timestampElement = document.querySelector(".current-time-display");
    let timestamp = "";

    if (timestampElement) {
      timestamp = timestampElement.innerHTML;
    } else {
      handleErrorNullElement("timestampElement");
    }

    // srd is created first, then modified by isVideoSeeking, isVideoPaused, and isVideoPlaying before being pushed into the skipRewindData array.
    // this is also why we can't move srd creation into isVideoSeeking - isVideoPaused and isVideoPlaying won't be able to access it.
    const srd: SkipRewindDatum = {
      prevTimestamp: "",
      timestamp: "",
      isSkipping: false,
      isRewinding: false,
      isPlay: false,
      isPause: false,
    };

    if (isVideoSeeking) {
      if (isVideoPlaying) {
        srd.isPlay = true;
      } else if (isVideoPaused) {
        srd.isPause = true;
      }

      // saves the timestamp when the video started seeking.
      // if video seeks from timestamp A to B, this saves A, and marks as hasSeeked.
      // isVideoPlaying and isVideoPaused rely on this information to determine whether the video has been seeked forward or backward (skipped or rewound).
      if (!hasSeeked) {
        setPrevTimestamp(timestamp);
        setHasSeeked(true);
      }
    }

    if (isVideoPlaying) {
      const ppd: PlayPauseDatum = { timestamp: timestamp, isPlay: true, isPause: false, isActive: false };
      if (isUserActive) {
        ppd.isActive = true;
      }

      // inserts only when there are no duplicates
      const isFound = playPauseData.some((element) => {
        if (
          element.timestamp === ppd.timestamp &&
          element.isPlay === ppd.isPlay &&
          element.isPause === ppd.isPause &&
          element.isActive === ppd.isActive
        ) {
          return true;
        }
        return false;
      });
      if (!isFound) {
        playPauseData.push(ppd);
      }

      // handle seeking while video is playing.
      if (hasSeeked && isVideoSeeking) {
        if (prevTimestamp != timestamp) {
          setHasSeeked(false);

          if (prevTimestamp < timestamp) {
            srd.isSkipping = true;
            srd.prevTimestamp = prevTimestamp;
            srd.timestamp = timestamp;
          } else if (prevTimestamp > timestamp) {
            srd.isRewinding = true;
            srd.prevTimestamp = prevTimestamp;
            srd.timestamp = timestamp;
          }

          setPrevTimestamp(timestamp);

          // inserts only when there are no duplicates
          const isFound = skipRewindData.some((element) => {
            if (
              element.prevTimestamp === srd.prevTimestamp &&
              element.timestamp === srd.timestamp &&
              element.isSkipping === srd.isSkipping &&
              element.isRewinding === srd.isRewinding &&
              element.isPlay === srd.isPlay &&
              element.isPause === srd.isPause
            ) {
              return true;
            }
            return false;
          });
          if (!isFound) {
            skipRewindData.push(srd);
          }
        }
      }
    }

    if (isVideoPaused) {
      const ppd: PlayPauseDatum = { timestamp: timestamp, isPlay: false, isPause: true, isActive: false };
      if (isUserActive) {
        ppd.isActive = true;
      }

      // inserts only when there are no duplicates
      const isFound = playPauseData.some((element) => {
        if (
          element.timestamp === ppd.timestamp &&
          element.isPlay === ppd.isPlay &&
          element.isPause === ppd.isPause &&
          element.isActive === ppd.isActive
        ) {
          return true;
        }
        return false;
      });
      if (!isFound) {
        playPauseData.push(ppd);
      }

      // handle skipping while video is paused.
      if (hasSeeked && !isVideoSeeking) {
        setHasSeeked(false);

        if (prevTimestamp < timestamp) {
          srd.isSkipping = true;
          srd.prevTimestamp = prevTimestamp;
          srd.timestamp = timestamp;
        } else if (prevTimestamp > timestamp) {
          srd.isRewinding = true;
          srd.prevTimestamp = prevTimestamp;
          srd.timestamp = timestamp;
        }

        // inserts only when there are no duplicates
        const isFound = skipRewindData.some((element) => {
          if (
            element.prevTimestamp === srd.prevTimestamp &&
            element.timestamp === srd.timestamp &&
            element.isSkipping === srd.isSkipping &&
            element.isRewinding === srd.isRewinding &&
            element.isPlay === srd.isPlay &&
            element.isPause === srd.isPause
          ) {
            return true;
          }
          return false;
        });
        if (!isFound) {
          skipRewindData.push(srd);
        }
      }
    }

    if (isVideoDone) {
      observer.disconnect();

      const vidLearningData = {
        fullTranscript: fullTranscript,
        timeSegData: timeSegData,
        playPauseData: playPauseData,
        skipRewindData: skipRewindData,
      };
      console.log(vidLearningData);

      makePostReq(vidLearningData);
    }
  };

  return videoObserverCallback;
}
