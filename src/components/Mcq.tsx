import { QuestionField } from "./QuestionField";
import { AnswerField } from "./AnswerField";
import { Lm } from "../types";

interface Props {
  lmArray: Lm[];
  index: number;
}

const Mcq = ({ lmArray, index }: Props) => {
  let question = "";
  let answers: string[] = [];

  if (index >= 0) {
    question = lmArray[index].md_flashcard[0].question;
    answers = lmArray[index].md_flashcard[0].answers;
  }
  return (
    <>
      <h3>MCQ:</h3>
      {index >= 0 && <QuestionField question={question} />}
      {index >= 0 &&
        answers.map((answer, answerIndex) => {
          return <AnswerField key={answerIndex} answerIndex={answerIndex} answer={answer} />;
        })}
    </>
  );
};

export { Mcq };
