import { useEffect, FormEvent, Dispatch } from "react";
import { Flashcard } from "../types";
import "../styles/CardAdd.css";

interface Props {
  card: Flashcard;
  handleAddSubmit: (event: FormEvent) => void;
  qBuffer: string;
  mcqAnsBuffer: string;
  qaAnsBuffer: string;
  setQBuffer: Dispatch<React.SetStateAction<string>>;
  setMcqAnsBuffer: Dispatch<React.SetStateAction<string>>;
  setQaAnsBuffer: Dispatch<React.SetStateAction<string>>;
}

const CardAdd = ({
  card,
  handleAddSubmit,
  qBuffer,
  mcqAnsBuffer,
  qaAnsBuffer,
  setQBuffer,
  setMcqAnsBuffer,
  setQaAnsBuffer,
}: Props) => {
  // initially, buffers will update once mcqAnswers and qaAnswers are loaded.
  useEffect(() => {
    if (card) {
      setQBuffer("<Your question here>");
      setMcqAnsBuffer(
        '[\n  {\n    "option": "<your answer here>",\n    "isCorrect": <your boolean here>\n  },\n  {\n    "option": "<your answer here>",\n    "isCorrect": <your boolean here>\n  }\n]'
      );
      setQaAnsBuffer("<Your answer here>");
    }
  }, [setQBuffer, setMcqAnsBuffer, setQaAnsBuffer, card]);
  return (
    <>
      <div id="cardAddContainer">
        <form className="cardForm" onSubmit={handleAddSubmit}>
          <textarea className="cardQInput" value={qBuffer} onChange={(e) => setQBuffer(e.target.value)} />
          {card && card.type === "m" && (
            <textarea className="cardAInput" value={mcqAnsBuffer} onChange={(e) => setMcqAnsBuffer(e.target.value)} />
          )}
          {card && card.type === "q" && (
            <textarea className="cardAInput" value={qaAnsBuffer} onChange={(e) => setQaAnsBuffer(e.target.value)} />
          )}
          <button className="submitBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export { CardAdd };
