import { VideoLm, Concept } from "../types";
import "../styles/ConceptLabel.css";

interface Props {
  lmArray: VideoLm[];
  index: number;
}

const ConceptLabel = ({ lmArray, index }: Props) => {
  console.log("from conceptLabel", index);
  let concepts: Concept[] = [];
  if (index >= 0) {
    concepts = lmArray[index].concepts;
  }

  return (
    <>
      <div id="concept">
        <h3>Concept:</h3>
        {index >= 0 &&
          concepts &&
          concepts.map((concept, idx) => {
            return <p key={idx}>{concept.name}</p>;
          })}
      </div>
    </>
  );
};

export { ConceptLabel };
