import { AnswerChoice } from "../types";
import "../styles/AnswerField.css";

interface Props {
  answerIndex: number;
  answerChoiceIndex: number;
  answerChoice: AnswerChoice;
  handleClick: (i: number, acIndex: number) => void;
}

const AnswerField = ({ answerIndex, answerChoiceIndex, answerChoice, handleClick }: Props) => {
  // when an item is clicked, it will turn green or red depending on whether it's correct or not.
  // on re-render, will turn transparent.
  return (
    <>
      <div
        id="answer"
        onClick={() => handleClick(answerIndex, answerChoiceIndex)}
        style={answerChoice.isClicked ? { backgroundColor: answerChoice.color } : { backgroundColor: "transparent" }}
      >
        <p>
          {answerChoiceIndex == 0 ? "A" : "B"}: {answerChoice.answer}
        </p>
      </div>
    </>
  );
};

export { AnswerField };
