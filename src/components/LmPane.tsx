import { useEffect, useState } from "react";
import { VideoLm } from "../types";
import { LmDropdown } from ".";
import "../styles/LmPane.css";

interface Props {
  lmArray: VideoLm[];
  updateArr: (value: VideoLm[]) => void;
  handleIndex: (value: number) => void;
  index: number;
}

const LmPane = ({ lmArray, updateArr, handleIndex, index }: Props) => {
  const [idText, setIdText] = useState("");
  const [startTimeText, setStartTimeText] = useState("");
  const [endTimeText, setEndTimeText] = useState("");
  const [videoUrlText, setVideoUrlText] = useState("");
  const [conceptsText, setConceptsText] = useState("");

  useEffect(() => {
    console.log("lmArray", lmArray, index);
    if (index >= 0) {
      setIdText(lmArray[index].id);
      setStartTimeText(lmArray[index].startTime);
      setEndTimeText(lmArray[index].endTime);
      setVideoUrlText(lmArray[index].videoUrl);

      lmArray[index].concepts.forEach((concept, i) => {
        if (i === 0) {
          setConceptsText(concept);
        } else {
          setConceptsText(conceptsText + ", " + concept);
        }
      });
    }
  }, [index, lmArray]);

  const [startTimeTempText, setStartTimeTempText] = useState("");
  const [endTimeTempText, setEndTimeTempText] = useState("");
  const [videoUrlTempText, setVideoUrlTempText] = useState("");
  const [conceptsTempText, setConceptsTempText] = useState("");

  const [mode, setMode] = useState("display");

  const handleEdit = () => {
    setStartTimeTempText(lmArray[index].startTime);
    setEndTimeTempText(lmArray[index].endTime);
    setVideoUrlTempText(lmArray[index].videoUrl);
    let ctt = "";
    lmArray[index].concepts.forEach((concept, i) => {
      if (i === 0) {
        ctt = concept;
      } else {
        ctt += ", " + concept;
      }
    });
    setConceptsTempText(ctt);
    setMode("edit");
  };

  const handleAdd = () => {
    setStartTimeTempText("");
    setEndTimeTempText("");
    setVideoUrlTempText("");
    setConceptsTempText("");
    setMode("add");
  };

  const handleDelete = () => {
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
    if (index >= 0) {
      const lmId = newLmArray[index].id;
      console.log("lmId:", lmId);

      newLmArray.splice(index, 1);
      console.log("deleted:", newLmArray);
      setIdText("");
      setStartTimeText("");
      setEndTimeText("");
      setVideoUrlText("");
      setConceptsText("");

      if (lmArray.length === 1) {
        handleIndex(-1);
      } else {
        handleIndex(0);
      }
      updateArr(newLmArray);

      // makeDeleteReq(`/lms/id/${lmId}`);
    }
  };

  const handleCancel = () => {
    setMode("display");
  };

  const handleSubmit = () => {
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));

    if (mode === "edit") {
      newLmArray[index].startTime = startTimeTempText;
      newLmArray[index].endTime = endTimeTempText;
      newLmArray[index].videoUrl = videoUrlTempText;
      newLmArray[index].concepts = conceptsTempText.split(", ");
    } else if (mode === "add") {
      const newLm: VideoLm = {
        id: "",
        startTime: startTimeTempText,
        endTime: endTimeTempText,
        videoUrl: videoUrlTempText,
        concepts: conceptsTempText.split(", "),
        flashcards: [],
        visibility: "Development",
      };

      newLmArray.push(newLm);
      handleIndex(newLmArray.length - 1);
    }

    updateArr(newLmArray);

    // push changes to server
    if (mode === "add") {
      const payload = newLmArray[newLmArray.length - 1];
      console.log("payload:", payload);
      // makePostReq("/lms", payload);
    } else if (mode === "edit") {
      const payload = newLmArray[index];
      console.log("payload:", payload);
      // makePutReq("/lms", payload);
    }

    setMode("display");
  };

  const handlePrev = () => {
    if (index === 0) {
      handleIndex(lmArray.length - 1);
    } else {
      handleIndex((index - 1) % lmArray.length);
    }
  };

  const handleNext = () => {
    handleIndex((index + 1) % lmArray.length);
  };

  return (
    <>
      <div id="lmPaneContainer">
        <div id="lmPaneNavbar">
          {/* <Dropdown lmArray={lmArray} handleIndex={handleIndex} index={index} /> */}
          <p id="lmHeader">Learning Moments:</p>
          <div className="navbarSpacer"></div>
          <div id="lmBtnContainer">
            <button id="prevLmBtn" onClick={handlePrev}>
              &lt;
            </button>
            <span id="lmCounter">
              {index + 1} / {lmArray.length}
            </span>
            <button id="nextLmBtn" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>
        {mode === "display" && (
          <>
            <div id="lmPaneDisplayContainer">
              <table className="table">
                <tr>
                  <td>
                    <span className="label">ID:</span>
                  </td>
                  <td>{idText}</td>
                </tr>
                <tr>
                  <td>
                    <span className="label">Start:</span>
                  </td>
                  <td>{startTimeText}</td>
                </tr>
                <tr>
                  <td>
                    <span className="label">End:</span>
                  </td>
                  <td>{endTimeText}</td>
                </tr>
                <tr>
                  <td>
                    <span className="label">URL:</span>
                  </td>
                  <td>{videoUrlText}</td>
                </tr>
                <tr>
                  <td>
                    <span className="label">Concepts:</span>
                  </td>
                  <td>{conceptsText}</td>
                </tr>
              </table>
            </div>
            <div id="lmPaneBottomBarContainer">
              <div id="lmPaneVisibilityMenuContainer">
                <LmDropdown lmArray={lmArray} updateArr={updateArr} index={index} />
              </div>
              <div className="lmPaneBtnContainer">
                <button id="lmAddBtn" onClick={handleAdd}>
                  Add
                </button>
                <button id="lmEditBtn" onClick={handleEdit}>
                  Edit
                </button>
                <button id="lmDelBtn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
        {mode === "edit" && (
          <>
            <div id="editFormContainer">
              <form id="editForm">
                <table className="table">
                  <tr>
                    <td>
                      <span className="label">ID:</span>
                    </td>
                    <td>{idText}</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="label">Start:</span>
                    </td>
                    <td className="item">
                      <textarea
                        id="startTextarea"
                        value={startTimeTempText}
                        onChange={(e) => setStartTimeTempText(e.target.value)}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="label">End:</span>
                    </td>
                    <td>
                      <textarea
                        id="endTextarea"
                        value={endTimeTempText}
                        onChange={(e) => setEndTimeTempText(e.target.value)}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="label">URL:</span>
                    </td>
                    <td>
                      <textarea
                        id="urlTextarea"
                        value={videoUrlTempText}
                        onChange={(e) => setVideoUrlTempText(e.target.value)}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="label">Concepts:</span>
                    </td>
                    <td>
                      <textarea
                        id="conceptsTextarea"
                        value={conceptsTempText}
                        onChange={(e) => setConceptsTempText(e.target.value)}
                      ></textarea>
                    </td>
                  </tr>
                </table>
              </form>
            </div>
            <div className="lmPaneBtnContainer">
              <button className="submitBtn" onClick={handleSubmit}>
                Submit
              </button>
              <button id="lmCancelBtn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        )}
        {mode === "add" && (
          <>
            <div id="addFormContainer">
              <form>
                <table className="table">
                  <tr>
                    <td>
                      <span className="label">ID:</span>
                    </td>
                    <td>ID will be automatically assigned :D</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="label">Start:</span>
                    </td>
                    <textarea
                      rows={1}
                      value={startTimeTempText}
                      onChange={(e) => setStartTimeTempText(e.target.value)}
                    ></textarea>
                  </tr>
                  <tr>
                    <td>
                      <span className="label">End:</span>
                    </td>
                    <textarea
                      rows={1}
                      value={endTimeTempText}
                      onChange={(e) => setEndTimeTempText(e.target.value)}
                    ></textarea>
                  </tr>
                  <tr>
                    <td>
                      <span className="label">URL:</span>
                    </td>
                    <textarea
                      rows={1}
                      value={videoUrlTempText}
                      onChange={(e) => setVideoUrlTempText(e.target.value)}
                    ></textarea>
                  </tr>
                </table>
              </form>
              <div className="lmPaneBtnContainer">
                <button className="submitBtn" onClick={handleSubmit}>
                  Submit
                </button>
                <button id="lmCancelBtn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export { LmPane };
