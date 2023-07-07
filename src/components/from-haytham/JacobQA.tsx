import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Flashcard } from "../../types";

const QA: React.FC<{
  // obj: flashCard **original**
  obj: Flashcard;
}> = ({ obj }) => {
  const question: string = obj.content.question;

  // const answer: string = obj.content.answer; **original**
  const answer: string = obj.content.answer as string;

  // For the font-size
  // let backQuestionStyle: string, answerStyle: string; **original**

  const backQuestionStyle = "card-text back-text qa-question-back ";

  const answerStyle = "card-text back-text qa-answer";

  // Coponent Being Rendered
  return (
    <>
      {/* Front Question Text */}
      <ReactMarkdown
        className="card-text front-text qa-question"
        children={question}
        remarkPlugins={[remarkGfm]}
      ></ReactMarkdown>

      {/* Back Question Text */}
      <ReactMarkdown className={backQuestionStyle} children={question} remarkPlugins={[remarkGfm]}></ReactMarkdown>
      {/* Back Answer Text */}
      <ReactMarkdown className={answerStyle} children={answer} remarkPlugins={[remarkGfm]}></ReactMarkdown>
    </>
  );
};

export default QA;
