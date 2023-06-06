interface Props {
  answerIndex: number;
  answer: string;
}

const AnswerField = ({ answerIndex, answer }: Props) => {
  return (
    <>
      <p>
        {answerIndex == 0 ? "A" : "B"}: {answer}
      </p>
    </>
  );
};

export { AnswerField };
