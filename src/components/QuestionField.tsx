interface Props {
  question: string;
}

const QuestionField = ({ question }: Props) => {
  return (
    <>
      <p>Q: {question}</p>
    </>
  );
};

export { QuestionField };
