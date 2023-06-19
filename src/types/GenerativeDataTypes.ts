export interface AnswerChoice {
  answer: string;
  color: string;
  isClicked: boolean;
}

export interface Flashcard {
  question: string;
  answerChoices: AnswerChoice[];
}

export interface VideoLm {
  id: string;
  videoUrl: string;
  startTime: string;
  endTime: string;
  concept: {
    id: string;
    name: string;
  };
  mdFlashcard: Flashcard[];
}

export interface Lm {
  id: string;
}
