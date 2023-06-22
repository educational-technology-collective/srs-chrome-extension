import { useEffect, useState } from "react";
import { Card } from ".";
import { VideoLm, Flashcard } from "../types";
import "../styles/Pane3.css";

interface Props {
  lmArray: VideoLm[];
  index: number;
  updateArr: (value: VideoLm[]) => void;
}

const Pane3 = ({ lmArray, index, updateArr }: Props) => {
  const [flashcards, setFlashcards] = useState([] as Flashcard[]);
  const [fcIndex, setFcIndex] = useState(0);

  // let flashcards: Flashcard[] = [];
  useEffect(() => {
    if (index >= 0) {
      setFlashcards(lmArray[index].flashcards);
    }
  }, [index, lmArray]);

  const handlePrev = () => {
    if (fcIndex === 0) {
      setFcIndex(flashcards.length - 1);
    } else {
      setFcIndex((fcIndex - 1) % flashcards.length);
    }
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
