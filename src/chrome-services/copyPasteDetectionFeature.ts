export const detectCopy = () => {
  document.addEventListener("copy", onCopy);
};

const onCopy = () => {
  console.log(document.getSelection()?.toString());
};

export const detectPaste = () => {
  document.addEventListener("paste", onPaste);
};

const onPaste = (e: ClipboardEvent) => {
  console.log(e.clipboardData?.getData("text"));
};
