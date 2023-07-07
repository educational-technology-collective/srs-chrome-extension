// import Choices from "../MCQComponents/Choices"; **original**
import Choices from "./JacobChoices";
import "./Card.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Flashcard, McqAnswer } from "../../types";

const MCQ: React.FC<{
  // obj: flashCard; **original**
  obj: Flashcard;
  isClicked: boolean; // **added**
}> = ({ obj, isClicked }) => {
  const question: string = obj.content.question;
  // const choice: individualChoice[] = obj.content.answer; **original**
  const choice: McqAnswer[] = obj.content.answer as McqAnswer[];

  // let frontQuestionStyle: string, backQuestionStyle: string; **original**

  const frontQuestionStyle = "front-text mcq-question card-text";
  const backQuestionStyle = "card-text  back-text mcq-question";

  // Component Being Rendered
  return (
    <>
      {/* Question Text Front */}
      <ReactMarkdown className={frontQuestionStyle} children={question} remarkPlugins={[remarkGfm]}></ReactMarkdown>

      {/* Question Text Back */}
      <ReactMarkdown className={backQuestionStyle} children={question} remarkPlugins={[remarkGfm]}></ReactMarkdown>

      {/* Component for all the choices */}
      {/* <Choices answer={choice} /> **original** */}
      <Choices answer={choice} clicked={isClicked} />
    </>
  );
};

export default MCQ;
