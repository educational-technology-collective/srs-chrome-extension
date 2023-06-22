import { Concept, VideoLm } from "../types";
import "../styles/ConceptLabel.css";

interface Props {
  concepts: Concept[];
  conceptIndex: number;
  setConcepts: React.Dispatch<React.SetStateAction<Concept[]>>;
  lmArray: VideoLm[];
  lmIndex: number;
  updateArr: (value: VideoLm[]) => void;
}

const ConceptLabel = ({ concepts, conceptIndex, setConcepts, lmArray, lmIndex, updateArr }: Props) => {
  const handleDelete = () => {
    const newConcepts: Concept[] = JSON.parse(JSON.stringify(concepts));
    newConcepts.splice(conceptIndex, 1);
    console.log("deleted:", newConcepts);

    setConcepts(newConcepts);

    const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
    newLmArray[lmIndex].concepts = newConcepts;
    updateArr(newLmArray);

    // TODO: DELETE request to DB.
  };

  return (
    <>
      <div className="conceptContainer">
        <div className="concept">
          <span>{concepts[conceptIndex].name}</span>
        </div>
        <div className="delConceptBtnContainer">
          <button className="delConceptBtn" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </>
  );
};

export { ConceptLabel };
