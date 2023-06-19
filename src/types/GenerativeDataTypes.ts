export interface AnswerChoice {
  answer: string;
  color: string;
  isClicked: boolean;
}

export interface Flashcard {
  question: string;
  answerChoices: AnswerChoice[];
}

export interface Concept {
  id: string;
  name: string;
}

export interface VideoLm {
  id: string;
  videoUrl: string;
  startTime: string;
  endTime: string;
  concepts: Concept[];
  mdFlashcard: Flashcard[];
}

export interface Lm {
  id: string;
}
