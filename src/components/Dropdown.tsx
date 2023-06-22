import { DropdownItem } from "./DropdownItem";
import { VideoLm } from "../types";
import "../styles/Dropdown.css";

interface Props {
  lmArray: VideoLm[];
  handleIndex: (value: number) => void;
  index: number;
}

// this is a dropdown menu that lists all the captured learning moments.
const Dropdown = ({ lmArray, handleIndex, index }: Props) => {
  const handleChange = () => {
    const e = document.getElementById("lmSelectMenu") as HTMLSelectElement;
    const value = +e.value;
    // const text = e.options[e.selectedIndex].text;
    handleIndex(value);
  };

  return (
    <>
      <div id="dropdown">
        <select name="" id="lmSelectMenu" onChange={handleChange}>
          <option value="-1">Select a learning moment...</option>
          {lmArray.map((lm, idx) => {
            // return !lm.deleted && <DropdownItem key={index} index={index} value={lm.endTime} />;
            return <DropdownItem key={idx} index={idx} value={lm.endTime} />;
          })}
        </select>
      </div>
    </>
  );
};

export { Dropdown };
