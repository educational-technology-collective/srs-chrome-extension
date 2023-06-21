import "../styles/QaAnswerField.css";

interface Props {
  ans: string;
}

const QaAnswerField = ({ ans }: Props) => {
  return (
    <>
      <div className="qaAnswer">
        <p>{ans}</p>
      </div>
    </>
  );
};

export { QaAnswerField };
