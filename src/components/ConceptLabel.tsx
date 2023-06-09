import { Lm } from "../types";
import "../styles/ConceptLabel.css";

interface Props {
  lmArray: Lm[];
  index: number;
}

const ConceptLabel = ({ lmArray, index }: Props) => {
  console.log("from conceptLabel", index);

  let conceptNameWithCase = "";
  let conceptClassificationWithCase = "";
  console.log("index:", index);
  if (index >= 0) {
    console.log(lmArray[index].conceptName);
    console.log(lmArray[index].conceptClassification);
    conceptNameWithCase = lmArray[index].conceptName[0].toUpperCase() + lmArray[index].conceptName.substring(1);
    conceptClassificationWithCase =
      lmArray[index].conceptClassification[0].toUpperCase() + lmArray[index].conceptClassification.substring(1);
  }

  return (
    <>
      <div id="concept">
        <h3>Concept:</h3>
        <p>{index >= 0 && conceptNameWithCase}</p>
      </div>
      <div id="conceptClassification">
        <h3>Concept Classification:</h3>
        <p>{index >= 0 && conceptClassificationWithCase}</p>
      </div>
    </>
  );
};

export { ConceptLabel };
