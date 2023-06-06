import { useState } from "react";
import { Dropdown, ConceptLabel, Mcq } from "./components";
import { Lm } from "./types";
import "./App.css";

function App() {
  const lmArray: Lm[] = [
    {
      start_time: "0:16",
      end_time: "2:09",
      concept_name: "relational theory",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "Is understanding relational theory helpful in understanding merging and joining?",
          answers: ["Yes", "No"],
        },
      ],
    },
    {
      start_time: "0:25",
      end_time: "1:00",
      concept_name: "venn diagram",
      concept_classification: "factual knowledge",
      md_flashcard: [
        {
          question: "What is a venn diagram used for?",
          answers: ["To show change in value over time", "To show commonalities and differences of attributes"],
        },
      ],
    },
    {
      start_time: "1:11",
      end_time: "15:31",
      concept_name: "join",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "When do we need joins?",
          answers: [
            "When we want to bring data from different datasets into one pile",
            "When we want to join the air force",
          ],
        },
      ],
    },
    {
      start_time: "1:16",
      end_time: "1:40",
      concept_name: "outer join",
      concept_classification: "factual knowledge",
      md_flashcard: [
        {
          question: "What is another name for a full outer join?",
          answers: ["Union", "Intersection"],
        },
      ],
    },
    {
      start_time: "1:41",
      end_time: "2:07",
      concept_name: "inner join",
      concept_classification: "factual knowledge",
      md_flashcard: [
        {
          question: "What is another name for an inner join?",
          answers: ["Union", "Intersection"],
        },
      ],
    },
    {
      start_time: "2:17",
      end_time: "10:15",
      concept_name: "merging",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "What is the function that we use for merging DataFrames?",
          answers: ["pd.merge", "pd.merge_on"],
        },
      ],
    },
    {
      start_time: "3:39",
      end_time: "4:24",
      concept_name: "merge union",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How would we write a union in Pandas?",
          answers: [
            "pd.merge(df1, df2, how='union', left_index=True, right_index=True)",
            "pd.merge(df1, df2, how='outer', left_index=True, right_index=True)",
          ],
        },
      ],
    },
    {
      start_time: "4:25",
      end_time: "4:54",
      concept_name: "merge intersection",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How would we write an intersection in Pandas?",
          answers: [
            "pd.merge(df1, df2, how='inner', left_index=True, right_index=True)",
            "pd.merge(df1, df2, how='intersection', left_index=True, right_index=True)",
          ],
        },
      ],
    },
    {
      start_time: "4:55",
      end_time: "5:58",
      concept_name: "set addition",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "What are the two types of set addition covered in this lecture?",
          answers: ["Left join, right join", "Left add, right add"],
        },
      ],
    },
    {
      start_time: "5:01",
      end_time: "5:38",
      concept_name: "left join",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "What does left join include?",
          answers: ["df1's data without intersection", "df1's data including the intersection"],
        },
      ],
    },
    {
      start_time: "5:39",
      end_time: "5:58",
      concept_name: "right join",
      concept_classification: "proedural knowledge",
      md_flashcard: [
        {
          question: "How do you do a right join using merge?",
          answers: [
            "pd.merge(df1, df2, how='right', left_index=True, right_index=True)",
            "pd.merge(df1, df2, join_type='right', left_index=True, right_index=True)",
          ],
        },
      ],
    },
    {
      start_time: "5:58",
      end_time: "6:51",
      concept_name: "merge on column",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "Should you include index parameters if you are merging on a specific column?",
          answers: ["No", "Yes"],
        },
      ],
    },
    {
      start_time: "6:52",
      end_time: "8:53",
      concept_name: "how to resolve conflicts between dataframes",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How does pandas preserve conflicting columns?",
          answers: ["It appends _x and _y", "It appends _1 and _2"],
        },
      ],
    },
    {
      start_time: "8:55",
      end_time: "10:14",
      concept_name: "multi-indexing and multiple columns",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How do we merge on multiple columns?",
          answers: ["Call merge separately for each column", "Pass an array of columns to merge"],
        },
      ],
    },
    {
      start_time: "10:16",
      end_time: "14:52",
      concept_name: "concat",
      concept_classification: "conceptual knowledge",
      md_flashcard: [
        {
          question: "How does concat stitch together DataFrames?",
          answers: ["It joins two DataFrames vertically", "It's just an alias of merge"],
        },
      ],
    },
    {
      start_time: "10:30",
      end_time: "14:52",
      concept_name: "concat example",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "What function do we use to concatenate two DataFrames?",
          answers: ["pd.concat", "pd.cat"],
        },
      ],
    },
    {
      start_time: "11:30",
      end_time: "11:36",
      concept_name: "cell magic",
      concept_classification: "factual knowledge",
      md_flashcard: [
        {
          question: "How do we use cell magic?",
          answers: ["%%", "##"],
        },
      ],
    },
    {
      start_time: "11:37",
      end_time: "12:14",
      concept_name: "cell magic example",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How do we suppress Jupyter's warning messages?",
          answers: ["%%suppress", "%%capture"],
        },
      ],
    },
    {
      start_time: "13:48",
      end_time: "14:52",
      concept_name: "handle ambiguous keys",
      concept_classification: "procedural knowledge",
      md_flashcard: [
        {
          question: "How do you handle ambiguous keys during a concat?",
          answers: ["Pass in an array of keys", "This will not happen during a concat"],
        },
      ],
    },
  ];

  const [index, setIndex] = useState(-1);

  const handleIndex = (value: number) => {
    console.log("LM INDEX:", value);
    setIndex(value);
  };

  return (
    <>
      <Dropdown lmArray={lmArray} handleIndex={handleIndex} />
      <ConceptLabel lmArray={lmArray} index={index} />
      <Mcq lmArray={lmArray} index={index} />
    </>
  );
}

export default App;
