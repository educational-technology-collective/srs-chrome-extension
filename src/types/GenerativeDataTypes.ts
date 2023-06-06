export interface Flashcard {
  question: string;
  answers: string[];
}

export interface Lm {
  start_time: string;
  end_time: string;
  concept_name: string;
  concept_classification: string;
  md_flashcard: Flashcard[];
}
