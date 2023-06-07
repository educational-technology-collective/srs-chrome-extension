interface Props {
  name: string;
  index: number;
  deleteArr: (i: number) => void;
}

const DeleteButton = ({ name, index, deleteArr }: Props) => {
  return (
    <>
      <button onClick={() => deleteArr(index)}>{name}</button>
    </>
  );
};

export { DeleteButton };
