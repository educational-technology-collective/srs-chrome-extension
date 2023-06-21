import { ConceptLabel } from ".";
import { VideoLm, Concept } from "../types";
import "../styles/Pane2.css";

interface Props {
  lmArray: VideoLm[];
  index: number;
}

const Pane2 = ({ lmArray, index }: Props) => {
  let concepts: Concept[] = [];
  if (index >= 0) {
    concepts = lmArray[index].concepts;
  }

  return (
    <>
      <div id="pane2Container">
        <p id="conceptHeader">Concepts:</p>
        {index >= 0 &&
          concepts &&
          concepts.map((concept, idx) => {
            return <ConceptLabel key={idx} concept={concept.name} />;
          })}
        <button className="addConceptBtn">+</button>
      </div>
    </>
  );
};

export { Pane2 };
