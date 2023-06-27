export interface McqAnswer {
  option: string;
  isCorrect: boolean;
}

export interface Flashcard {
  lmId: string;
  type: string;
  content: {
    question: string;
    answer: McqAnswer[] | string;
  };
}

export interface VideoLm {
  id: string;
  videoUrl: string;
  startTime: string;
  endTime: string;
  concepts: string[]; // for frontend use
  flashcards: Flashcard[]; // for frontend use
}

export interface Lm {
  id: string;
}
