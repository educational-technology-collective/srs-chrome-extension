import { DropdownItem } from "./DropdownItem";
import { VideoLm } from "../types";
import "../styles/LmDropdown.css";

interface Props {
  lmArray: VideoLm[];
  updateArr: (value: VideoLm[]) => void;
  index: number;
}

// this is a dropdown menu that lists all the captured learning moments.
const LmDropdown = ({ lmArray, updateArr, index }: Props) => {
  const handleChange = () => {
    if (index >= 0) {
      const e = document.getElementById("lmSelectMenu") as HTMLSelectElement;
      const newLmArray: VideoLm[] = JSON.parse(JSON.stringify(lmArray));
      newLmArray[index].visibility = e.value;
      updateArr(newLmArray);

      // push changes to server.
      const payload = newLmArray[index];
      console.log("payload:", payload);
      // makePutReq("/lms", payload);
    }
  };

  return (
    <>
      <div id="dropdown">
        <select name="" id="lmSelectMenu" onChange={handleChange} value={index >= 0 ? lmArray[index].visibility : ""}>
          {index >= 0 && (
            <>
              <DropdownItem value={"Development"} />;
              <DropdownItem value={"Review"} />;
              <DropdownItem value={"Production"} />;
            </>
          )}
        </select>
      </div>
    </>
  );
};

export { LmDropdown };
