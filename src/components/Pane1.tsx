import { Dropdown } from ".";
import { VideoLm } from "../types";
import "../styles/Pane1.css";

interface Props {
  lmArray: VideoLm[];
  handleIndex: (value: number) => void;
  index: number;
}

const Pane1 = ({ lmArray, handleIndex, index }: Props) => {
  return (
    <>
      <Dropdown lmArray={lmArray} handleIndex={handleIndex} />
      {index >= 0 && (
        <>
          <table id="table">
            <tr>
              <td>
                <span className="label">ID:</span>
              </td>
              <td>{lmArray[index].id}</td>
            </tr>
            <tr>
              <td>
                <span className="label">Start:</span>
              </td>
              <td>{lmArray[index].startTime}</td>
            </tr>
            <tr>
              <td>
                <span className="label">End:</span>
              </td>
              <td>{lmArray[index].endTime}</td>
            </tr>
            <tr>
              <td>
                <span className="label">URL:</span>
              </td>
              <td>{lmArray[index].videoUrl}</td>
            </tr>
          </table>
        </>
      )}
    </>
  );
};

export { Pane1 };
