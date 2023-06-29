import { McqAnswerField, QaAnswerField } from ".";
import { Flashcard, McqAnswer } from "../types";
import "../styles/CardDisplay.css";

interface Props {
  card: Flashcard;
}

const CardDisplay = ({ card }: Props) => {
  let mcqAnswers: McqAnswer[] = [];
  let qaAnswer = "";

  if (card) {
    if (card.type === "m") {
      mcqAnswers = card.content.answer as McqAnswer[];
    } else if (card.type === "q") {
      qaAnswer = card.content.answer as string;
    }
  }

  return (
    <>
      <div id="cardDisplayContainer">
        <div id="cardQ">{card && <p>Q: {card.content.question}</p>}</div>
        {card && card.type === "m" && (
          <div id="mcqAns">
            {mcqAnswers.map((ans, idx) => {
              return <McqAnswerField key={idx} ans={ans} />;
            })}
          </div>
        )}
        {card && card.type === "q" && (
          <div id="qaAns">
            <QaAnswerField ans={qaAnswer} />
          </div>
        )}
      </div>
    </>
  );
};

export { CardDisplay };
