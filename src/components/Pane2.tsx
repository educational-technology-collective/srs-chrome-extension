import { FormEvent, useEffect, useState } from "react";
import { ConceptLabel } from ".";
import { VideoLm } from "../types";
import "../styles/Pane2.css";

interface Props {
  lmArray: VideoLm[];
  index: number;
  updateArr: (value: VideoLm[]) => void;
}

const Pane2 = ({ lmArray, index, updateArr }: Props) => {
  const [concepts, setConcepts] = useState([] as string[]);
  useEffect(() => {
    if (index >= 0) {
      setConcepts(lmArray[index].concepts);
    }
  }, [index, lmArray]);

  const [mode, setMode] = useState("display");

  const handleClick = () => {
    if (mode === "display") {
      setMode("add");
    } else {
      setMode("display");
    }
  };

  const [newConcept, setNewConcept] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newConcepts = JSON.parse(JSON.stringify(concepts));
    newConcepts.push(newConcept);
    setConcepts(newConcepts);

    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
    newLmArray[index].concepts = newConcepts;
    updateArr(newLmArray);

    setMode("display");

    // push changes to server
    const payload = newLmArray[index];
    console.log("payload:", payload);
    // makePutReq("/lms", payload);
  };

  return (
    <>
      <div id="pane2Container">
        <p id="conceptHeader">Concepts:</p>
        {mode === "display" && (
          <>
            <div id="conceptLabelContainer">
              {index >= 0 &&
                concepts &&
                concepts.map((_concept, idx) => {
                  return (
                    <ConceptLabel
                      key={idx}
                      concepts={concepts}
                      conceptIndex={idx}
                      setConcepts={setConcepts}
                      lmArray={lmArray}
                      lmIndex={index}
                      updateArr={updateArr}
                    />
                  );
                })}
            </div>
          </>
        )}
        {mode === "add" && (
          <>
            <div id="addFormContainer">
              <form id="addForm" onSubmit={handleSubmit}>
                <textarea
                  id="conceptInput"
                  rows={5}
                  value={newConcept}
                  onChange={(e) => setNewConcept(e.target.value)}
                />
                <button type="submit">Add new concept</button>
              </form>
            </div>
          </>
        )}
        <div id="btnContainer">
          <button id="addConceptBtn" onClick={handleClick}>
            {mode === "display" ? "Add" : "Cancel"}
          </button>
        </div>
      </div>
    </>
  );
};

export { Pane2 };
