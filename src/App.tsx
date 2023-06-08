import { useState } from "react";
import { Dropdown, ConceptLabel, Mcq, DeleteButton } from "./components";
import { Lm } from "./types";
import "./styles/App.css";

function App() {
  // move this to a separate DB in the future.
  const lmArray: Lm[] = [
    {
      id: 0,
      start_time: "0:16",
      end_time: "2:09",
      concept_name: "relational theory",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "Is understanding relational theory helpful in understanding merging and joining?",
          answerChoices: [
            { answer: "Yes", color: "green", isClicked: false },
            { answer: "No", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 1,
      start_time: "0:25",
      end_time: "1:00",
      concept_name: "venn diagram",
      concept_classification: "factual knowledge",
      md_flashcard: [
        {
          question: "What is a venn diagram used for?",
          answerChoices: [
            { answer: "To show change in value over time", color: "red", isClicked: false },
            { answer: "To show commonalities and differences of attributes", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 2,
      start_time: "1:11",
      end_time: "15:31",
      concept_name: "join",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
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
    },
    {
      id: 3,
      start_time: "1:16",
      end_time: "1:40",
      concept_name: "outer join",
      concept_classification: "factual knowledge",
      md_flashcard: [
        {
          question: "What is another name for a full outer join?",
          answerChoices: [
            { answer: "Union", color: "green", isClicked: false },
            { answer: "Intersection", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 4,
      start_time: "1:41",
      end_time: "2:07",
      concept_name: "inner join",
      concept_classification: "factual knowledge",
      md_flashcard: [
        {
          question: "What is another name for an inner join?",
          answerChoices: [
            { answer: "Union", color: "red", isClicked: false },
            { answer: "Intersection", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 5,
      start_time: "2:17",
      end_time: "10:15",
      concept_name: "merging",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "What is the function that we use for merging DataFrames?",
          answerChoices: [
            { answer: "pd.merge", color: "green", isClicked: false },
            { answer: "pd.merge_on", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 6,
      start_time: "3:39",
      end_time: "4:24",
      concept_name: "merge union",
      concept_classification: "procedural knowledge",
      md_flashcard: [
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
    },
    {
      id: 7,
      start_time: "4:25",
      end_time: "4:54",
      concept_name: "merge intersection",
      concept_classification: "procedural knowledge",
      md_flashcard: [
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
    },
    {
      id: 8,
      start_time: "4:55",
      end_time: "5:58",
      concept_name: "set addition",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "What are the two types of set addition covered in this lecture?",
          answerChoices: [
            { answer: "Left join, right join", color: "green", isClicked: false },
            { answer: "Left add, right add", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 9,
      start_time: "5:01",
      end_time: "5:38",
      concept_name: "left join",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "What does left join include?",
          answerChoices: [
            { answer: "df1's data without intersection", color: "red", isClicked: false },
            { answer: "df1's data including the intersection", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 10,
      start_time: "5:39",
      end_time: "5:58",
      concept_name: "right join",
      concept_classification: "proedural knowledge",
      md_flashcard: [
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
    },
    {
      id: 11,
      start_time: "5:58",
      end_time: "6:51",
      concept_name: "merge on column",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "Should you include index parameters if you are merging on a specific column?",
          answerChoices: [
            { answer: "No", color: "green", isClicked: false },
            { answer: "Yes", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 12,
      start_time: "6:52",
      end_time: "8:53",
      concept_name: "how to resolve conflicts between dataframes",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How does pandas preserve conflicting columns?",
          answerChoices: [
            { answer: "It appends _x and _y", color: "green", isClicked: false },
            { answer: "It appends _1 and _2", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 13,
      start_time: "8:55",
      end_time: "10:14",
      concept_name: "multi-indexing and multiple columns",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How do we merge on multiple columns?",
          answerChoices: [
            { answer: "Call merge separately for each column", color: "red", isClicked: false },
            { answer: "Pass an array of columns to merge", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 14,
      start_time: "10:16",
      end_time: "14:52",
      concept_name: "concat",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "How does concat stitch together DataFrames?",
          answerChoices: [
            { answer: "It joins two DataFrames vertically", color: "green", isClicked: false },
            { answer: "It's just an alias of merge", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 15,
      start_time: "10:30",
      end_time: "14:52",
      concept_name: "concat example",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "What function do we use to concatenate two DataFrames?",
          answerChoices: [
            { answer: "pd.concat", color: "green", isClicked: false },
            { answer: "pd.cat", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 16,
      start_time: "11:30",
      end_time: "11:36",
      concept_name: "cell magic",
      concept_classification: "factual knowledge",
      md_flashcard: [
        {
          question: "How do we use cell magic?",
          answerChoices: [
            { answer: "%%", color: "green", isClicked: false },
            { answer: "##", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 17,
      start_time: "11:37",
      end_time: "12:14",
      concept_name: "cell magic example",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How do we suppress Jupyter's warning messages?",
          answerChoices: [
            { answer: "%%suppress", color: "red", isClicked: true },
            { answer: "%%capture", color: "green", isClicked: false },
          ],
        },
      ],
      deleted: false,
    },
    {
      id: 18,
      start_time: "13:48",
      end_time: "14:52",
      concept_name: "handle ambiguous keys",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How do you handle ambiguous keys during a concat?",
          answerChoices: [
            { answer: "Pass in an array of keys", color: "green", isClicked: false },
            { answer: "This will not happen during a concat", color: "red", isClicked: false },
          ],
        },
      ],
      deleted: false,
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
  };

  // determines whether an answer choice is clicked or not.
  // makes sure that the choice turns green or red, or transparent when reset.
  const handleClick = (i: number, acIndex: number) => {
    const newLmArray = arr.map((lm, idx) => {
      if (i === idx) {
        lm.md_flashcard[0].answerChoices[acIndex].isClicked = true;
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
      <DeleteButton name={"Delete this learning moment"} index={index} deleteArr={deleteArr} />
    </>
  );
}

export default App;
