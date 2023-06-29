import { VideoLm } from "../types";
import "../styles/ConceptLabel.css";

interface Props {
  concepts: string[];
  conceptIndex: number;
  setConcepts: React.Dispatch<React.SetStateAction<string[]>>;
  lmArray: VideoLm[];
  lmIndex: number;
  updateArr: (value: VideoLm[]) => void;
}

const ConceptLabel = ({ concepts, conceptIndex, setConcepts, lmArray, lmIndex, updateArr }: Props) => {
  const handleDelete = () => {
    const newConcepts: string[] = JSON.parse(JSON.stringify(concepts));
    newConcepts.splice(conceptIndex, 1);
    console.log("deleted:", newConcepts);

    setConcepts(newConcepts);

    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
    newLmArray[lmIndex].concepts = newConcepts;
    updateArr(newLmArray);

    // push changes to server
    const payload = newLmArray[lmIndex];
    console.log("payload:", payload);
    // makePutReq("/lms", payload);
  };

  return (
    <>
      <div className="conceptContainer">
        <div className="concept">
          <span>{concepts[conceptIndex]}</span>
        </div>
        <div className="delConceptBtnContainer">
          <button className="delConceptBtn" onClick={handleDelete}>
            x
          </button>
        </div>
      </div>
    </>
  );
};

export { ConceptLabel };
