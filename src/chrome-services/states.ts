let prevTimestamp = "";
const setPrevTimestamp = (value: string) => {
  prevTimestamp = value;
};

let hasSeeked = false;
const setHasSeeked = (value: boolean) => {
  hasSeeked = value;
};

export { prevTimestamp, setPrevTimestamp };
export { hasSeeked, setHasSeeked };
