import { useEffect, useState } from "react";
import { Dropdown } from ".";
import { VideoLm } from "../types";
import "../styles/Pane1.css";

interface Props {
  lmArray: VideoLm[];
  updateArr: (value: VideoLm[]) => void;
  handleIndex: (value: number) => void;
  index: number;
}

const Pane1 = ({ lmArray, updateArr, handleIndex, index }: Props) => {
  const [idText, setIdText] = useState("");
  const [startTimeText, setStartTimeText] = useState("");
  const [endTimeText, setEndTimeText] = useState("");
  const [videoUrlText, setVideoUrlText] = useState("");

  useEffect(() => {
    console.log("lmArray", lmArray, index);
    if (index >= 0) {
      setIdText(lmArray[index].id);
      setStartTimeText(lmArray[index].startTime);
      setEndTimeText(lmArray[index].endTime);
      setVideoUrlText(lmArray[index].videoUrl);
    }
  }, [index, lmArray]);

  const [startTimeTempText, setStartTimeTempText] = useState("");
  const [endTimeTempText, setEndTimeTempText] = useState("");
  const [videoUrlTempText, setVideoUrlTempText] = useState("");

  const [mode, setMode] = useState("display");

  const handleEdit = () => {
    setStartTimeTempText(lmArray[index].startTime);
    setEndTimeTempText(lmArray[index].endTime);
    setVideoUrlTempText(lmArray[index].videoUrl);
    setMode("edit");
  };

  const handleAdd = () => {
    setStartTimeTempText("");
    setEndTimeTempText("");
    setVideoUrlTempText("");
    setMode("add");
  };

  const handleDelete = () => {
    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
    if (index >= 0) {
      newLmArray.splice(index, 1);
      console.log("deleted:", newLmArray);
      setIdText("");
      setStartTimeText("");
      setEndTimeText("");
      setVideoUrlText("");

      if (lmArray.length === 1) {
        handleIndex(-1);
      } else {
        handleIndex(0);
      }
      updateArr(newLmArray);
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
    } else if (mode === "add") {
      const newLm: VideoLm = {
        id: "",
        startTime: startTimeTempText,
        endTime: endTimeTempText,
        videoUrl: videoUrlTempText,
        concepts: [],
        flashcards: [],
      };

      newLmArray.push(newLm);
    }

    updateArr(newLmArray);
    handleIndex(newLmArray.length - 1);

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
      <div id="pane1Container">
        <div id="pane1Navbar">
          {/* <Dropdown lmArray={lmArray} handleIndex={handleIndex} index={index} /> */}
          <p id="lmHeader">Learning Moments:</p>
          <div id="lmBtnContainer">
            <button id="prevLmBtn" onClick={handlePrev}>
              &lt;
            </button>
            <button id="nextLmBtn" onClick={handleNext}>
              &gt;
            </button>
          </div>
        </div>
        {mode === "display" && (
          <>
            <div id="tableContainer">
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
              </table>
            </div>
            <div className="pane1BtnContainer">
              <button id="lmEditBtn" onClick={handleEdit}>
                Edit
              </button>
              <button id="lmAddBtn" onClick={handleAdd}>
                Add
              </button>
              <button id="lmDelBtn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        )}
        {mode === "edit" && (
          <>
            <div id="editFormContainer">
              <form>
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
              <div className="pane1BtnContainer">
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
              <div className="pane1BtnContainer">
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

export { Pane1 };
