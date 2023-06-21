import { useState } from "react";
import { Card } from ".";
import { VideoLm, Flashcard } from "../types";
import "../styles/Pane3.css";

interface Props {
  lmArray: VideoLm[];
  index: number;
  updateArr: (value: VideoLm[]) => void;
}

const Pane3 = ({ lmArray, index, updateArr }: Props) => {
  const [fcIndex, setFcIndex] = useState(0);

  let flashcards: Flashcard[] = [];
  if (index >= 0) {
    flashcards = lmArray[index].flashcards;
  }

  const handlePrev = () => {
    setFcIndex((fcIndex - 1) % flashcards.length);
  };

  const handleNext = () => {
    setFcIndex((fcIndex + 1) % flashcards.length);
  };

  return (
    <>
      <div id="pane3Container">
        <div id="pane3Navbar">
          <p id="flashcardHeader">Flashcard:</p>
          <div id="cardBtnContainer">
            <button id="prevCardBtn" onClick={handlePrev}>
              &lt;
            </button>
            <button id="nextCardBtn" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>
        {index >= 0 && (
          <Card cards={flashcards} cardIndex={fcIndex} lmArray={lmArray} lmIndex={index} updateArr={updateArr} />
        )}
      </div>
    </>
  );
};

export { Pane3 };
