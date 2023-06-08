import { QuestionField } from "./QuestionField";
import { AnswerField } from "./AnswerField";
import { Lm, AnswerChoice } from "../types";
import "../styles/Mcq.css";

interface Props {
  lmArray: Lm[];
  index: number;
  handleClick: (i: number, acIndex: number) => void;
}

const Mcq = ({ lmArray, index, handleClick }: Props) => {
  let question = "";
  let answerChoices: AnswerChoice[] = [];

  if (index >= 0) {
    question = lmArray[index].md_flashcard[0].question;
    answerChoices = lmArray[index].md_flashcard[0].answerChoices;
  }

  return (
    <>
      <div id="mcq">
        <h3>MCQ:</h3>
        <div id="quiz">
          {index >= 0 && <QuestionField question={question} />}
          {index >= 0 &&
            answerChoices.map((answerChoice, answerChoiceIndex) => {
              return (
                <AnswerField
                  key={answerChoiceIndex}
                  answerIndex={index}
                  answerChoiceIndex={answerChoiceIndex}
                  answerChoice={answerChoice}
                  handleClick={handleClick}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export { Mcq };
