export interface SegmentDatum {
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
  videoUrl: string;
  action: string;
}

export interface SkipRewindDatum {
  startTimestamp: string;
  endTimestamp: string;
  videoUrl: string;
  action: string;
}

export interface CourseDatum {
  courseTitle: string;
  courseSlug: string;
  videoTitle: string;
  videoSlug: string;
  videoUrl: string;
  videoLength: string;
  fullTranscript: string;
  segmentData: SegmentDatum[];
  structure: [
    {
      start: string;
      end: string;
      concept: string;
    }
  ];
}
