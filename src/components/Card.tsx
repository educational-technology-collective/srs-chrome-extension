import { McqAnswerField, QaAnswerField } from ".";
import { Flashcard, McqAnswer, VideoLm } from "../types";
import "../styles/Card.css";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  cards: Flashcard[];
  cardIndex: number;
  lmArray: VideoLm[];
  lmIndex: number;
  updateArr: (value: VideoLm[]) => void;
}

const Card = ({ cards, cardIndex, lmArray, lmIndex, updateArr }: Props) => {
  const cardType = cardIndex >= 0 ? cards[cardIndex].type : "";
  const [mcqAnswers, setMcqAnswers] = useState([] as McqAnswer[]);
  const [qaAnswer, setQaAnswer] = useState("");

  useEffect(() => {
    if (cardType === "m") {
      setMcqAnswers(cards[cardIndex].content.answer as McqAnswer[]);
    } else if (cardType === "q") {
      setQaAnswer(cards[cardIndex].content.answer as string);
    }
  }, [cardType, cardIndex, cards]);

  // text versions are used in edit and add modes.
  const [qText, setQText] = useState(cards[cardIndex].content.question);
  const [mcqAnsText, setMcqAnsText] = useState("");
  const [qaAnsText, setQaAnsText] = useState("");

  // initially, texts will update once mcqAnswers and qaAnswers are loaded.
  useEffect(() => {
    setMcqAnsText(JSON.stringify(mcqAnswers));
    setQaAnsText(qaAnswer);
  }, [mcqAnswers, qaAnswer]);

  // three modes: display, edit, add.
  const [mode, setMode] = useState("display");

  const handleEdit = () => {
    setMode("edit");
  };

  const handleAdd = () => {
    setQText("");
    setMcqAnsText('[{"option":<your string here>,"isCorrect":<your boolean here>}]');
    setQaAnsText("");
    setMode("add");
  };

  const handleEditSubmit = (event: FormEvent) => {
    event.preventDefault();
    // send POST/PUT request to server

    // update lmArray object
    const newLmArray = JSON.parse(JSON.stringify(lmArray));

    newLmArray[lmIndex].flashcards[cardIndex].content.question = qText;
    if (cardType === "m") {
      newLmArray[lmIndex].flashcards[cardIndex].content.answer = JSON.parse(mcqAnsText);
    } else if (cardType === "q") {
      newLmArray[lmIndex].flashcards[cardIndex].content.answer = qaAnsText;
    }

    updateArr(newLmArray);

    setMode("display");
    console.log("edit submit");
  };

  const handleAddSubmit = (event: FormEvent) => {
    event.preventDefault();
    // sned POST request to server

    // update lmArray object
    const newLmArray = JSON.parse(JSON.stringify(lmArray));

    const newMcqFc: Flashcard = { lmId: "", type: cardType, content: { question: qText, answer: [] } };
    const newQaFc: Flashcard = { lmId: "", type: cardType, content: { question: qText, answer: "" } };

    if (cardType === "m") {
      newMcqFc.content.answer = JSON.parse(mcqAnsText);
      newLmArray[lmIndex].flashcards.push(newMcqFc);
    } else if (cardType === "q") {
      newQaFc.content.answer = qaAnsText;
      newLmArray[lmIndex].flashcards.push(newQaFc);
    }

    updateArr(newLmArray);

    setMode("display");
    console.log("add submit");
  };

  return (
    <>
      {mode === "display" && (
        <div id="cardContainer">
          <div id="cardQ">
            {cardIndex >= 0 && (
              <>
                <p>Q: {cards[cardIndex].content.question}</p>
              </>
            )}
          </div>
          {cardType === "m" && (
            <>
              <div id="mcqAns">
                {mcqAnswers.map((ans, idx) => {
                  return <McqAnswerField key={idx} ans={ans} />;
                })}
              </div>
            </>
          )}
          {cardType === "q" && (
            <>
              <div id="qaAns">
                <QaAnswerField ans={qaAnswer} />
              </div>
            </>
          )}
          <div>
            <button onClick={handleEdit}>Edit</button>
          </div>
          <div>
            <button onClick={handleAdd}>Add</button>
          </div>
        </div>
      )}
      {mode === "edit" && (
        <div id="cardEditFormContainer">
          <form className="cardForm" onSubmit={handleEditSubmit}>
            <textarea className="cardInput" value={qText} onChange={(e) => setQText(e.target.value)} />
            {cardType === "m" && (
              <textarea className="cardInput" value={mcqAnsText} onChange={(e) => setMcqAnsText(e.target.value)} />
            )}
            {cardType === "q" && (
              <textarea className="cardInput" value={qaAnsText} onChange={(e) => setQaAnsText(e.target.value)} />
            )}
            <button className="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
      {mode === "add" && (
        <div id="cardAddFormContainer">
          <form className="cardForm" onSubmit={handleAddSubmit}>
            <textarea className="cardInput" value={qText} onChange={(e) => setQText(e.target.value)} />
            {cardType === "m" && (
              <textarea className="cardInput" value={mcqAnsText} onChange={(e) => setMcqAnsText(e.target.value)} />
            )}
            {cardType === "q" && (
              <textarea className="cardInput" value={qaAnsText} onChange={(e) => setQaAnsText(e.target.value)} />
            )}
            <button className="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export { Card };
