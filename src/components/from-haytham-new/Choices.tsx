import { IncorrectChoice, CorrectChoice } from "./MCQChoice";
import "./Choices.css";
import { individualChoice } from "./types";

const Choices: React.FC<{
  answer: individualChoice[];
  clicked: boolean;
  // setClickStatus: () => void;
  // handleTestEvaluation: (result: string) => void;
}> = ({ answer, clicked }) => {
  // const choices: individualChoice[] = answer;
  // console.log("choices:", choices);

  // Function that Shuffles the Array of Choices
  // const shuffleArray = (array: any) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // };

  // const [randomArray, setArray] = useState([]);

  // UseEffect makes sure that the choices are shuffled only once
  // useEffect(() => {
  //   setArray(shuffleArray(answer));
  // }, []);
  // console.log(randomArray);

  // Transform the Choices 180 degrees after clicking
  const containerStyle = clicked ? "choice-container back-side" : "choice-container front-side";

  // Component Being Rendered
  return (
    <div className={containerStyle}>
      {/* Mapping the Choices Based on Whether they are correct or not */}
      {answer.map((choice: individualChoice, index: number) =>
        choice.isCorrect ? (
          <CorrectChoice
            option={choice.option}
            clicked={clicked}
            // setClickStatus={setClickStatus}
            key={index}
            // handleTestEvaluation={handleTestEvaluation}
          />
        ) : (
          <IncorrectChoice
            option={choice.option}
            clicked={clicked}
            // setClickStatus={setClickStatus}
            key={index}
            // handleTestEvaluation={handleTestEvaluation}
          />
        )
      )}
    </div>
  );
};

export default Choices;
