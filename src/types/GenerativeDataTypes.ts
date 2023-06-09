export interface AnswerChoice {
  answer: string;
  color: string;
  isClicked: boolean;
}

export interface Flashcard {
  question: string;
  answerChoices: AnswerChoice[];
}

export interface Lm {
  id: number;
  startTime: string;
  endTime: string;
  conceptName: string;
  conceptClassification: string;
  mdFlashcard: Flashcard[];
  deleted: boolean;
  saved: boolean;
}
