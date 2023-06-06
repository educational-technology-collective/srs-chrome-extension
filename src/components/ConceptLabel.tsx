import { Lm } from "../types";

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
    console.log(lmArray[index].concept_name);
    console.log(lmArray[index].concept_classification);
    conceptNameWithCase = lmArray[index].concept_name[0].toUpperCase() + lmArray[index].concept_name.substring(1);
    conceptClassificationWithCase =
      lmArray[index].concept_classification[0].toUpperCase() + lmArray[index].concept_classification.substring(1);
  }

  return (
    <>
      <h3>Concept:</h3>
      <p>{index >= 0 && conceptNameWithCase}</p>
      <h3>Concept Classification:</h3>
      <p>{index >= 0 && conceptClassificationWithCase}</p>
    </>
  );
};

export { ConceptLabel };
