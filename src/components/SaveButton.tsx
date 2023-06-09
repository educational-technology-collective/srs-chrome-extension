import "../styles/SaveButton.css";

interface Props {
  name: string;
  index: number;
  saveArr: (i: number) => void;
}

const SaveButton = ({ name, index, saveArr }: Props) => {
  return (
    <>
      <button id="saveBtn" onClick={() => saveArr(index)}>
        {name}
      </button>
    </>
  );
};

export { SaveButton };
