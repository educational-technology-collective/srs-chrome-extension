import { AnswerChoice } from "../types";

interface Props {
  answerIndex: number;
  answerChoiceIndex: number;
  answerChoice: AnswerChoice;
  handleClick: (i: number, acIndex: number) => void;
}

const AnswerField = ({ answerIndex, answerChoiceIndex, answerChoice, handleClick }: Props) => {
  console.log("answer field loaded!");

  return (
    <>
      <div
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
