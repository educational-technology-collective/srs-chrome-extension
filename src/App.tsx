import { useState, useEffect } from "react";
import { Dropdown, ConceptLabel, LoginButton, LogoutButton } from "./components";
import { VideoLm } from "./types";
import "./styles/App.css";

const API_GATEWAY = "https://fqtje2wqfl.execute-api.us-east-1.amazonaws.com/default";

// makes GET request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
// params is an array of param-paramValue pair.
// for example, if my URL parameter is ?param1=pv1&param2=pv2,
// params = [["param1", "pv1"], ["param2", "pv2"]]
const makeGetReq = async (endpoint: string, params: string[][]) => {
  try {
    let paramStr = "?";
    params.forEach((param) => {
      const p = `${param[0]}=${encodeURIComponent(param[1])}&`;
      paramStr += p;
    });
    paramStr = paramStr.substring(0, paramStr.length - 1);
    console.log(paramStr);
    const url = API_GATEWAY + endpoint + paramStr;
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await resp.json();
    console.log("GET:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  // we may need a state to track current url to trigger a full rerender.
  // this way the GET request will be sent again.
  const lmArray: VideoLm[] = [];
  const [arr, setArr] = useState(lmArray);
  useEffect(() => {
    // switch url to window.location.toString() in prod.
    makeGetReq("/lm/video", [
      ["videoUrl", "https://www.coursera.org/learn/python-data-analysis/lecture/TPrDp/introduction-to-specialization"],
    ])
      .then((res) => {
        setArr(res);
      })
      .catch((err) => {
        console.log("Error while fetching videoLM:", err);
      });
  }, []);

  // lmArray index handling.
  // this index is used to access specific elements of the lmArray.
  const [index, setIndex] = useState(-1);
  const handleIndex = (value: number) => {
    console.log("LM INDEX:", value);
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
      <Dropdown lmArray={arr} handleIndex={handleIndex} />
      <ConceptLabel lmArray={arr} index={index} />
      {/* <Mcq lmArray={arr} index={index} handleClick={handleClick} /> */}
      <div id="deleteSaveContainer">
        {/* <DeleteButton name={"Delete this learning moment"} index={index} deleteArr={deleteArr} /> */}
        {/* <SaveButton name={"Save this learning moment"} index={index} saveArr={saveArr} /> */}
      </div>
      <LoginButton />
      <LogoutButton />
    </>
  );
}

export default App;
