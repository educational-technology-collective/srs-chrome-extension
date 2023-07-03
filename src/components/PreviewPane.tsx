import { Flashcard } from "../types";
import JacobCard from "./from-haytham/JacobCard";
import "../styles/PreviewPane.css";

interface Props {
  flashcard: Flashcard;
}

const PreviewPane = ({ flashcard }: Props) => {
  return (
    <>
      <div id="previewPaneContainer">
        <JacobCard obj={flashcard} />
      </div>
    </>
  );
};

export { PreviewPane };
