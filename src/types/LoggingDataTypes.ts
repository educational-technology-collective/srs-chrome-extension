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
  timestamp: string;
  isSkipping: boolean;
  isRewind: boolean;
}
