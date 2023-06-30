import { FormEvent, useEffect, useState } from "react";
import { CardDisplay, CardAdd, CardEdit, FcDropdown } from ".";
import { VideoLm, Flashcard } from "../types";
import "../styles/FcPane.css";

interface Props {
  lmArray: VideoLm[];
  lmIndex: number;
  updateArr: (value: VideoLm[]) => void;
}

const FcPane = ({ lmArray, lmIndex, updateArr }: Props) => {
  const [flashcards, setFlashcards] = useState([] as Flashcard[]);
  const [fcIndex, setFcIndex] = useState(-1);
  const [mode, setMode] = useState("display");
  const [q2Add, setQ2Add] = useState("m");

  useEffect(() => {
    if (lmIndex >= 0) {
      setFlashcards(lmArray[lmIndex].flashcards);
      if (flashcards.length === 0) {
        console.log("triggered");
        setFcIndex(-1);
      } else {
        setFcIndex(0);
      }
    }

    console.log("length:", flashcards.length);
  }, [lmIndex, lmArray, flashcards.length]);

  const handlePrev = () => {
    console.log(fcIndex);
    if (flashcards.length === 0) {
      return;
    }

    if (fcIndex === 0) {
      setFcIndex(flashcards.length - 1);
    } else {
      setFcIndex((fcIndex - 1) % flashcards.length);
    }
    console.log(fcIndex);
  };

  const handleNext = () => {
    if (flashcards.length === 0) {
      return;
    }

    setFcIndex((fcIndex + 1) % flashcards.length);
  };

  const [qBuffer, setQBuffer] = useState("");
  const [mcqAnsBuffer, setMcqAnsBuffer] = useState("");
  const [qaAnsBuffer, setQaAnsBuffer] = useState("");

  const handleAddSelect = () => {
    setMode("addSelect");
  };

  const handleAddMcq = () => {
    setQ2Add("m");
    setMode("add");
  };

  const handleAddQa = () => {
    setQ2Add("q");
    setMode("add");
  };

  const handleEdit = () => {
    if (flashcards.length === 0) {
      return;
    }

    setMode("edit");
  };

  const handleDelete = () => {
    if (flashcards.length === 0) {
      return;
    }

    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
    const newFlashcards: Flashcard[] = JSON.parse(JSON.stringify(flashcards));
    if (fcIndex >= 0) {
      const fcId = newFlashcards[fcIndex].id;
      console.log("fcId:", fcId);

      newFlashcards.splice(fcIndex, 1);
      setFlashcards(newFlashcards);
      newLmArray[lmIndex].flashcards = JSON.parse(JSON.stringify(newFlashcards));
      updateArr(newLmArray);

      // push changes to server
      // makeDeleteReq(`/flashcards/id/${fcId}`);
    }

    if (flashcards.length === 1) {
      setFcIndex(-1);
    } else {
      setFcIndex(0);
    }

    setMode("display");
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

    // push changes to server
    const payload = newLmArray[lmIndex].flashcards[fcIndex];
    console.log("payload:", payload);
    // makePutReq("/flashcards", payload);

    setMode("display");
    console.log("edit submit");
  };

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();

    // update lmArray object
    const newLmArray = JSON.parse(JSON.stringify(lmArray));

    const newMcqFc: Flashcard = {
      id: "",
      lmId: lmArray[lmIndex].id,
      type: q2Add,
      content: { question: qBuffer, answer: [] },
      visibility: "Development",
    };

    const newQaFc: Flashcard = {
      id: "",
      lmId: lmArray[lmIndex].id,
      type: q2Add,
      content: { question: qBuffer, answer: "" },
      visibility: "Development",
    };

    if (q2Add === "m") {
      newMcqFc.content.answer = JSON.parse(mcqAnsBuffer);
      newLmArray[lmIndex].flashcards.push(newMcqFc);

      // push changes to server
      const payload = newMcqFc;
      console.log("payload:", payload);
      // makePostReq("/flashcards", payload);
    } else if (q2Add === "q") {
      newQaFc.content.answer = qaAnsBuffer;
      newLmArray[lmIndex].flashcards.push(newQaFc);
      // push changes to server
      const payload = newQaFc;
      console.log("payload:", payload);
      // makePostReq("/flashcards", payload);
    }

    updateArr(newLmArray);

    setMode("display");
    console.log("add submit");
  };

  return (
    <>
      <div id="fcPaneContainer">
        <div id="fcPaneNavbar">
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
        <div id="fcPaneFcContainer">
          {lmIndex >= 0 && mode === "display" && <CardDisplay card={flashcards[fcIndex]} />}
          {lmIndex >= 0 && mode === "add" && (
            <CardAdd
              // card={flashcards[fcIndex]}
              handleAddSubmit={handleAddSubmit}
              q2Add={q2Add}
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
        <div id="fcPaneBottomBarContainer">
          <div id="fcPaneVisibilityMenuContainer">
            {mode === "display" && (
              <FcDropdown
                lmArray={lmArray}
                updateArr={updateArr}
                lmIndex={lmIndex}
                flashcards={flashcards}
                fcIndex={fcIndex}
              />
            )}
          </div>
          <div id="fcPaneBtnContainer">
            {mode === "display" && (
              <>
                <button onClick={handleAddSelect}>Add</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
            {(mode === "edit" || mode === "add" || mode === "addSelect") && (
              <>
                {mode === "addSelect" && (
                  <>
                    <button onClick={handleAddMcq}>MCQ</button>
                    <button onClick={handleAddQa}>QA</button>
                  </>
                )}
                <button onClick={handleCancel}>Cancel</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { FcPane };
