import { DropdownItem } from "./DropdownItem";
import { Lm } from "../types";

interface Props {
  lmArray: Lm[];
  handleIndex: (value: number) => void;
}

// this is a dropdown menu that lists all the captured learning moments.
const Dropdown = ({ lmArray, handleIndex }: Props) => {
  const handleChange = () => {
    const e = document.getElementById("lmSelectMenu") as HTMLSelectElement;
    const value = +e.value;
    // const text = e.options[e.selectedIndex].text;
    handleIndex(value);
  };

  return (
    <>
      <select name="" id="lmSelectMenu" onChange={handleChange}>
        <option value="-1">Select a learning moment...</option>
        {lmArray.map((lm, index) => {
          return !lm.deleted && <DropdownItem key={index} index={index} value={lm.start_time} />;
        })}
      </select>
    </>
  );
};

export { Dropdown };
