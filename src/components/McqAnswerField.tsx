import { McqAnswer } from "../types";
import "../styles/McqAnswerField.css";

interface Props {
  ans: McqAnswer;
}

const McqAnswerField = ({ ans }: Props) => {
  return (
    <>
      <div className="mcqAnswer">
        <p>
          {ans.option} <span className="comment">// {ans.isCorrect.toString()}</span>
        </p>
      </div>
    </>
  );
};

export { McqAnswerField };
