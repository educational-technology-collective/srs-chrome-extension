import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Dropdown, ConceptLabel, Mcq, DeleteButton, SaveButton, LoginButton, LogoutButton } from "./components";
import { Lm } from "./types";
import "./styles/App.css";

function App() {
  // move this to a separate DB in the future.
  const lmArray: Lm[] = [
    {
      id: uuidv4(),
      startTime: "0:16",
      endTime: "2:09",
      conceptName: "relational theory",
      conceptClassification: "conceptual knowledge",
      mdFlashcard: [
        {
          question: "Is understanding relational theory helpful in understanding merging and joining?",
          answerChoices: [
            { answer: "Yes", color: "green", isClicked: false },
            { answer: "No", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "0:25",
      endTime: "1:00",
      conceptName: "venn diagram",
      conceptClassification: "factual knowledge",
      mdFlashcard: [
        {
          question: "What is a venn diagram used for?",
          answerChoices: [
            { answer: "To show change in value over time", color: "red", isClicked: false },
            { answer: "To show commonalities and differences of attributes", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "1:11",
      endTime: "15:31",
      conceptName: "join",
      conceptClassification: "conceptual knowledge",
      mdFlashcard: [
        {
          question: "When do we need joins?",
          answerChoices: [
            {
              answer: "When we want to bring data from different datasets into one pile",
              color: "green",
              isClicked: false,
            },
            { answer: "When we want to join the air force", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "1:16",
      endTime: "1:40",
      conceptName: "outer join",
      conceptClassification: "factual knowledge",
      mdFlashcard: [
        {
          question: "What is another name for a full outer join?",
          answerChoices: [
            { answer: "Union", color: "green", isClicked: false },
            { answer: "Intersection", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "1:41",
      endTime: "2:07",
      conceptName: "inner join",
      conceptClassification: "factual knowledge",
      mdFlashcard: [
        {
          question: "What is another name for an inner join?",
          answerChoices: [
            { answer: "Union", color: "red", isClicked: false },
            { answer: "Intersection", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "2:17",
      endTime: "10:15",
      conceptName: "merging",
      conceptClassification: "conceptual knowledge",
      mdFlashcard: [
        {
          question: "What is the function that we use for merging DataFrames?",
          answerChoices: [
            { answer: "pd.merge", color: "green", isClicked: false },
            { answer: "pd.merge_on", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "3:39",
      endTime: "4:24",
      conceptName: "merge union",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "How would we write a union in Pandas?",
          answerChoices: [
            {
              answer: "pd.merge(df1, df2, how='union', left_index=True, right_index=True)",
              color: "red",
              isClicked: false,
            },
            {
              answer: "pd.merge(df1, df2, how='outer', left_index=True, right_index=True)",
              color: "green",
              isClicked: false,
            },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "4:25",
      endTime: "4:54",
      conceptName: "merge intersection",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "How would we write an intersection in Pandas?",
          answerChoices: [
            {
              answer: "pd.merge(df1, df2, how='inner', left_index=True, right_index=True)",
              color: "green",
              isClicked: false,
            },
            {
              answer: "pd.merge(df1, df2, how='intersection', left_index=True, right_index=True)",
              color: "red",
              isClicked: false,
            },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "4:55",
      endTime: "5:58",
      conceptName: "set addition",
      conceptClassification: "conceptual knowledge",
      mdFlashcard: [
        {
          question: "What are the two types of set addition covered in this lecture?",
          answerChoices: [
            { answer: "Left join, right join", color: "green", isClicked: false },
            { answer: "Left add, right add", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "5:01",
      endTime: "5:38",
      conceptName: "left join",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "What does left join include?",
          answerChoices: [
            { answer: "df1's data without intersection", color: "red", isClicked: false },
            { answer: "df1's data including the intersection", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "5:39",
      endTime: "5:58",
      conceptName: "right join",
      conceptClassification: "proedural knowledge",
      mdFlashcard: [
        {
          question: "How do you do a right join using merge?",
          answerChoices: [
            {
              answer: "pd.merge(df1, df2, how='right', left_index=True, right_index=True)",
              color: "green",
              isClicked: false,
            },
            {
              answer: "pd.merge(df1, df2, join_type='right', left_index=True, right_index=True)",
              color: "red",
              isClicked: false,
            },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "5:58",
      endTime: "6:51",
      conceptName: "merge on column",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "Should you include index parameters if you are merging on a specific column?",
          answerChoices: [
            { answer: "No", color: "green", isClicked: false },
            { answer: "Yes", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "6:52",
      endTime: "8:53",
      conceptName: "how to resolve conflicts between dataframes",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "How does pandas preserve conflicting columns?",
          answerChoices: [
            { answer: "It appends _x and _y", color: "green", isClicked: false },
            { answer: "It appends _1 and _2", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "8:55",
      endTime: "10:14",
      conceptName: "multi-indexing and multiple columns",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "How do we merge on multiple columns?",
          answerChoices: [
            { answer: "Call merge separately for each column", color: "red", isClicked: false },
            { answer: "Pass an array of columns to merge", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "10:16",
      endTime: "14:52",
      conceptName: "concat",
      conceptClassification: "conceptual knowledge",
      mdFlashcard: [
        {
          question: "How does concat stitch together DataFrames?",
          answerChoices: [
            { answer: "It joins two DataFrames vertically", color: "green", isClicked: false },
            { answer: "It's just an alias of merge", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "10:30",
      endTime: "14:52",
      conceptName: "concat example",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "What function do we use to concatenate two DataFrames?",
          answerChoices: [
            { answer: "pd.concat", color: "green", isClicked: false },
            { answer: "pd.cat", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "11:30",
      endTime: "11:36",
      conceptName: "cell magic",
      conceptClassification: "factual knowledge",
      mdFlashcard: [
        {
          question: "How do we use cell magic?",
          answerChoices: [
            { answer: "%%", color: "green", isClicked: false },
            { answer: "##", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "11:37",
      endTime: "12:14",
      conceptName: "cell magic example",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "How do we suppress Jupyter's warning messages?",
          answerChoices: [
            { answer: "%%suppress", color: "red", isClicked: true },
            { answer: "%%capture", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
    {
      id: uuidv4(),
      startTime: "13:48",
      endTime: "14:52",
      conceptName: "handle ambiguous keys",
      conceptClassification: "procedural knowledge",
      mdFlashcard: [
        {
          question: "How do you handle ambiguous keys during a concat?",
          answerChoices: [
            { answer: "Pass in an array of keys", color: "green", isClicked: false },
            { answer: "This will not happen during a concat", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
      saved: false,
    },
  ];

  // lmArray index handling.
  // this index is used to access specific elements of the lmArray.
  const [index, setIndex] = useState(-1);
  const handleIndex = (value: number) => {
    console.log("LM INDEX:", value);
    setIndex(value);
  };

  // updates the lmArray itself.
  // used to delete elements from the array.
  const [arr, setArr] = useState(lmArray);
  const deleteArr = (i: number) => {
    if (i === -1) {
      return;
    }

    const newLmArray = arr.map((lm, idx) => {
      if (i === idx) {
        lm.deleted = true;
        return lm;
      } else {
        return lm;
      }
    });

    setArr(newLmArray);
    setIndex(-1);
    alert("deleted!");
  };

  // save elements.
  const saveArr = (i: number) => {
    if (i === -1) {
      return;
    }

    const newLmArray = arr.map((lm, idx) => {
      if (i === idx) {
        lm.saved = true;
        return lm;
      } else {
        return lm;
      }
    });

    setArr(newLmArray);
    console.log(newLmArray);
    alert("saved!");
  };

  // determines whether an answer choice is clicked or not.
  // makes sure that the choice turns green or red, or transparent when reset.
  const handleClick = (i: number, acIndex: number) => {
    const newLmArray = arr.map((lm, idx) => {
      if (i === idx) {
        lm.mdFlashcard[0].answerChoices[acIndex].isClicked = true;
        return lm;
      } else {
        return lm;
      }
    });

    setArr(newLmArray);
  };

  return (
    <>
      <Dropdown lmArray={arr} handleIndex={handleIndex} />
      <ConceptLabel lmArray={arr} index={index} />
      <Mcq lmArray={arr} index={index} handleClick={handleClick} />
      <div id="deleteSaveContainer">
        <DeleteButton name={"Delete this learning moment"} index={index} deleteArr={deleteArr} />
        <SaveButton name={"Save this learning moment"} index={index} saveArr={saveArr} />
      </div>
      <LoginButton />
      <LogoutButton />
    </>
  );
}

export default App;
