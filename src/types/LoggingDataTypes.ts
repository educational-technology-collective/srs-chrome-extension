export interface TimeSegDatum {
  timestamp: string;
  segment: string;
}

export interface IvqDatum {
  timestamp: string;
  question: string;
  answers: string[];
}

export interface PlayPauseDatum {
  timestamp: string;
  isPlay: boolean;
  isPause: boolean;
  isActive: boolean;
}

export interface SkipRewindDatum {
  prevTimestamp: string;
  timestamp: string;
  isSkipping: boolean;
  isRewinding: boolean;
  isPlay: boolean;
  isPause: boolean;
}

export interface CourseDatum {
  courseTitle: string;
  courseSlug: string;
  videoTitle: string;
  videoSlug: string;
  videoUrl: string;
  videoLength: string;
  fullTranscript: string;
  timeSegData: TimeSegDatum[];
  structure: [
    {
      start: string;
      end: string;
      concept: string;
    }
  ];
}
