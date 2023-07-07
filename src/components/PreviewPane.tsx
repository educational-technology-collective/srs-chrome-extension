import { flashCard } from "./from-haytham-new/types";
import Card from "./from-haytham-new/Card";
import "../styles/PreviewPane.css";
import { Flashcard } from "../types";

interface Props {
  flashcard: Flashcard;
}

const PreviewPane = ({ flashcard }: Props) => {
  console.log("original:", flashcard);
  // convert from one interface to another
  const flashcard2: flashCard = {
    _id: flashcard._id,
    lmid: flashcard.lmId,
    type: flashcard.type,
    content: flashcard.content,
  };

  // console.log("previewing:", flashcard2);

  return (
    <>
      <Card obj={flashcard2} />
    </>
  );
};

export { PreviewPane };
