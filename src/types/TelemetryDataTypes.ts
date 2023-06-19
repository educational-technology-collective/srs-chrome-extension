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
  userEmail: string;
  action: string;
  timestamp: string;
  videoUrl: string;
}

export interface SkipRewindDatum {
  userEmail: string;
  action: string;
  startTimestamp: string;
  endTimestamp: string;
  videoUrl: string;
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
