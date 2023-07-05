export interface McqAnswer {
  option: string;
  isCorrect: boolean;
}

export interface Flashcard {
  _id: string;
  lmId: string;
  type: string;
  content: {
    question: string;
    answer: McqAnswer[] | string;
  };
  visibility: string;
}

export interface VideoLm {
  _id: string;
  videoUrl: string;
  startTime: string;
  endTime: string;
  concepts: string[]; // for frontend use
  flashcards: Flashcard[]; // for frontend use
  visibility: string;
}

export interface Lm {
  id: string;
}
