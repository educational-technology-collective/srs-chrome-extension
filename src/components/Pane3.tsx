import { FormEvent, useEffect, useState } from "react";
import { CardDisplay, CardAdd, CardEdit } from ".";
import { VideoLm, Flashcard } from "../types";
import "../styles/Pane3.css";

interface Props {
  lmArray: VideoLm[];
  lmIndex: number;
  updateArr: (value: VideoLm[]) => void;
}

const Pane3 = ({ lmArray, lmIndex, updateArr }: Props) => {
  const [flashcards, setFlashcards] = useState([] as Flashcard[]);
  // const [flashcard, setFlashcard] = useState({} as Flashcard);
  const [fcIndex, setFcIndex] = useState(-1);
  const [mode, setMode] = useState("");

  useEffect(() => {
    if (lmIndex >= 0) {
      setFlashcards(lmArray[lmIndex].flashcards);
      if (flashcards.length === 0) {
        console.log("triggered");
        setFcIndex(-1);
      } else {
        setFcIndex(0);
      }
      // setFlashcard(flashcards[fcIndex]);
      setMode("display");
    }
  }, [lmIndex, lmArray]);

  const handlePrev = () => {
    console.log(fcIndex);
    if (fcIndex === 0) {
      setFcIndex(flashcards.length - 1);
      // setFlashcard(flashcards[flashcards.length - 1]);
    } else {
      setFcIndex((fcIndex - 1) % flashcards.length);
      // setFlashcard(flashcards[(fcIndex - 1) % flashcards.length]);
    }
    console.log(fcIndex);
  };

  const handleNext = () => {
    console.log(fcIndex);
    console.log(flashcards.length);
    console.log((fcIndex + 1) % flashcards.length);
    setFcIndex((fcIndex + 1) % flashcards.length);
    // setFlashcard(flashcards[(fcIndex + 1) % flashcards.length]);
    console.log(fcIndex);
    // console.log(flashcard);
  };

  const [qBuffer, setQBuffer] = useState("");
  const [mcqAnsBuffer, setMcqAnsBuffer] = useState("");
  const [qaAnsBuffer, setQaAnsBuffer] = useState("");

  const handleAdd = () => {
    setMode("add");
  };

  const handleEdit = () => {
    setMode("edit");
  };

  const handleDelete = () => {
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
    const newFlashcards: Flashcard[] = JSON.parse(JSON.stringify(flashcards));
    if (fcIndex >= 0) {
      newFlashcards.splice(fcIndex, 1);
      setFlashcards(newFlashcards);
      newLmArray[lmIndex].flashcards = JSON.parse(JSON.stringify(newFlashcards));
      updateArr(newLmArray);
    }

    if (flashcards.length === 1) {
      setFcIndex(-1);
    } else {
      setFcIndex(0);
    }

    setMode("delete");
  };

  const handleCancel = () => {
    setQBuffer("");
    setMcqAnsBuffer("");
    setQaAnsBuffer("");
    setMode("display");
  };

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();

    // update lmArray object
    const newLmArray = JSON.parse(JSON.stringify(lmArray));

    newLmArray[lmIndex].flashcards[fcIndex].content.question = qBuffer;
    if (flashcards[fcIndex].type === "m") {
      newLmArray[lmIndex].flashcards[fcIndex].content.answer = JSON.parse(mcqAnsBuffer);
    } else if (flashcards[fcIndex].type === "q") {
      newLmArray[lmIndex].flashcards[fcIndex].content.answer = qaAnsBuffer;
    }

    updateArr(newLmArray);

    // send PUT request to server
    // const payload = newLmArray[lmIndex].flashcards[cardIndex];
    // makePutReq("/flashcards", payload);

    setMode("display");
    console.log("edit submit");
  };

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();

    // update lmArray object
    const newLmArray = JSON.parse(JSON.stringify(lmArray));

    const newMcqFc: Flashcard = {
      lmId: "",
      type: flashcards[fcIndex].type,
      content: { question: qBuffer, answer: [] },
    };
    const newQaFc: Flashcard = { lmId: "", type: flashcards[fcIndex].type, content: { question: qBuffer, answer: "" } };

    if (flashcards[fcIndex].type === "m") {
      newMcqFc.content.answer = JSON.parse(mcqAnsBuffer);
      newLmArray[lmIndex].flashcards.push(newMcqFc);
    } else if (flashcards[fcIndex].type === "q") {
      newQaFc.content.answer = qaAnsBuffer;
      newLmArray[lmIndex].flashcards.push(newQaFc);
    }

    updateArr(newLmArray);

    // sned POST request to server
    // const payload = newLmArray[lmIndex].flashcards[cardIndex];
    // makePostReq("/flashcards", payload);

    setMode("display");
    console.log("add submit");
  };

  return (
    <>
      <div id="pane3Container">
        <div id="pane3Navbar">
          <p id="flashcardHeader">Flashcard:</p>
          <div className="navbarSpacer"></div>
          <div id="cardBtnContainer">
            <button id="prevCardBtn" onClick={handlePrev}>
              &lt;
            </button>
            <span id="fcCounter">
              {fcIndex + 1} / {flashcards.length}
            </span>
            <button id="nextCardBtn" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>
        <div id="pane3FcContainer">
          {lmIndex >= 0 && mode === "display" && <CardDisplay card={flashcards[fcIndex]} />}
          {lmIndex >= 0 && mode === "add" && (
            <CardAdd
              card={flashcards[fcIndex]}
              handleAddSubmit={handleAddSubmit}
              qBuffer={qBuffer}
              mcqAnsBuffer={mcqAnsBuffer}
              qaAnsBuffer={qaAnsBuffer}
              setQBuffer={setQBuffer}
              setMcqAnsBuffer={setMcqAnsBuffer}
              setQaAnsBuffer={setQaAnsBuffer}
            />
          )}
          {lmIndex >= 0 && mode === "edit" && (
            <CardEdit
              card={flashcards[fcIndex]}
              handleEditSubmit={handleEditSubmit}
              qBuffer={qBuffer}
              mcqAnsBuffer={mcqAnsBuffer}
              qaAnsBuffer={qaAnsBuffer}
              setQBuffer={setQBuffer}
              setMcqAnsBuffer={setMcqAnsBuffer}
              setQaAnsBuffer={setQaAnsBuffer}
            />
          )}
        </div>
        <div id="pane3BtnContainer">
          {mode === "display" && (
            <>
              <button onClick={handleAdd}>Add</button>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
          {(mode === "edit" || mode === "add") && (
            <>
              <button onClick={handleCancel}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export { Pane3 };
