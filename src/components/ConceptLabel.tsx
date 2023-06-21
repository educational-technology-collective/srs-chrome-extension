import "../styles/ConceptLabel.css";

interface Props {
  concept: string;
}

const ConceptLabel = ({ concept }: Props) => {
  return (
    <>
      <div className="conceptContainer">
        <div className="concept">
          <span>{concept}</span>
        </div>
        <div className="delConceptBtnContainer">
          <button className="delConceptBtn">X</button>
        </div>
      </div>
    </>
  );
};

export { ConceptLabel };
