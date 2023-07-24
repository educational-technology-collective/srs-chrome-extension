export interface McqAnswer {
  option: string;
  isCorrect: boolean;
}

export interface Flashcard {
  _id: string;
  lm_id: string;
  type: string;
  content: {
    question: string;
    answer: McqAnswer[] | string;
  };
  visibility: string;
}

export interface Lm {
  _id: string;
  platform: string;
  contentType: string;
  content: object;
  visibility: string;
}

export interface CourseraPlaybackLm extends Lm {
  content: {
    videoUrl: string;
    startTime: string;
    endTime: string;
    concepts: string[];
  };
}

export interface CourseraIvqLm extends Lm {
  content: {
    videoUrl: string;
    timestamp: string;
    question: string;
    answer: string;
    concepts: [];
  };
}
