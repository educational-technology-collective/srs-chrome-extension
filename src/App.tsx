import { useState, useEffect } from "react";
import { Pane1, Pane2, Pane3 } from "./components";
import { VideoLm } from "./types";
import { makeGetReq } from "./utils";
import "./styles/App.css";

function App() {
  // we may need a state to track current url to trigger a full rerender.
  // this way the GET request will be sent again.
  const lmArray: VideoLm[] = [];
  const [arr, setArr] = useState(lmArray);

  const updateArr = (value: VideoLm[]) => {
    setArr(value);
  };

  useEffect(() => {
    // switch url to window.location.toString() in prod.
    makeGetReq("/lm/video", [
      ["videoUrl", "https://www.coursera.org/learn/python-data-analysis/lecture/Kgwr5/merging-dataframes"],
    ])
      .then((res) => {
        setArr(res);
        setIndex(0);
        // send message to the service worker, so that it can update the state in chrome-services directory.
        chrome.runtime.sendMessage({ message: "GET from App", data: res });
      })
      .catch((err) => {
        console.log("Error while fetching videoLM:", err);
      });
  }, []);

  // lmArray index handling.
  // this index is used to access specific elements of the lmArray.
  const [index, setIndex] = useState(-1);
  const handleIndex = (value: number) => {
    setIndex(value);
  };

  // updates the lmArray itself.
  // used to delete elements from the array.
  // const deleteArr = (i: number) => {
  //   if (i === -1) {
  //     return;
  //   }

  //   const newLmArray = arr.map((lm, idx) => {
  //     if (i === idx) {
  //       lm.deleted = true;
  //       return lm;
  //     } else {
  //       return lm;
  //     }
  //   });

  //   setArr(newLmArray);
  //   setIndex(-1);
  //   alert("deleted!");
  // };

  // save elements.
  // const saveArr = (i: number) => {
  //   if (i === -1) {
  //     return;
  //   }

  //   const newLmArray = arr.map((lm, idx) => {
  //     if (i === idx) {
  //       lm.saved = true;
  //       return lm;
  //     } else {
  //       return lm;
  //     }
  //   });

  //   setArr(newLmArray);
  //   console.log(newLmArray);
  //   alert("saved!");
  // };

  // determines whether an answer choice is clicked or not.
  // makes sure that the choice turns green or red, or transparent when reset.
  // const handleClick = (i: number, acIndex: number) => {
  //   const newLmArray = arr.map((lm, idx) => {
  //     if (i === idx) {
  //       lm.mdFlashcard[0].answerChoices[acIndex].isClicked = true;
  //       return lm;
  //     } else {
  //       return lm;
  //     }
  //   });

  //   setArr(newLmArray);
  // };

  return (
    <>
      <div id="pane1">
        <Pane1 lmArray={arr} updateArr={updateArr} handleIndex={handleIndex} index={index} />
      </div>
      <div id="pane2">
        <Pane2 lmArray={arr} index={index} updateArr={updateArr} />
      </div>
      {/* <Mcq lmArray={arr} index={index} handleClick={handleClick} /> */}
      <div id="pane3">
        <Pane3 lmArray={arr} index={index} updateArr={updateArr} />
        {/* <DeleteButton name={"Delete this learning moment"} index={index} deleteArr={deleteArr} /> */}
        {/* <SaveButton name={"Save this learning moment"} index={index} saveArr={saveArr} /> */}
      </div>
    </>
  );
}

export default App;
