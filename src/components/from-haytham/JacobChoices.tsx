import { IncorrectChoice, CorrectChoice } from "./JacobMCQChoice";
import "./Choices.css";
import { McqAnswer } from "../../types";

const Choices: React.FC<{
  // answer: individualChoice[]; **original**
  answer: McqAnswer[];
  clicked: boolean;
}> = ({ answer, clicked }) => {
  // const choices: individualChoice[] = answer; **original**
  const choices = answer;

  // Transform the Choices 180 degrees after clicking
  const containerStyle = clicked ? "choice-container back-side" : "choice-container front-side";

  const randomArray = choices; // **added**

  // Component Being Rendered
  return (
    <div className={containerStyle}>
      {/* Mapping the Choices Based on Whether they are correct or not */}
      {/* {randomArray.map((choice: individualChoice, index) =>
        choice.isCorrect ? (
          <CorrectChoice option={choice.option} key={index} />
        ) : (
          <IncorrectChoice option={choice.option} key={index} />
        )
      )} */}
      {randomArray.map((choice, index) =>
        choice.isCorrect ? (
          <CorrectChoice option={choice.option} clicked={clicked} key={index} />
        ) : (
          <IncorrectChoice option={choice.option} clicked={clicked} key={index} />
        )
      )}
    </div>
  );
};

export default Choices;
