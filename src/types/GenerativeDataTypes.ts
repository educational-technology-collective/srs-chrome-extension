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
  start_time: string;
  end_time: string;
  concept_name: string;
  concept_classification: string;
  md_flashcard: Flashcard[];
  deleted: boolean;
}
