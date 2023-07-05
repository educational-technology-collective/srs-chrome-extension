// export const renderPreview = () => {
//   const listener = (payload: any) => {
//     if (payload.message === "preview") {
//       if (previewDiv.style.width === "0px") {
//         previewDiv.style.width = "390px";
//         previewDiv.style.height = "844px";
//         previewDiv.style.zIndex = "9999999";
//         const previewObj = new DOMParser().parseFromString(payload.data, "text/html");
//         console.log("previewObj", <HTMLDivElement>previewObj.body.firstChild);
//         previewDiv.appendChild(<HTMLDivElement>previewObj.body.firstChild);
//       }
//     }
//     return true;
//   };

//   const previewDiv = document.createElement("div");
//   previewDiv.style.position = "absolute";
//   previewDiv.style.width = "0";
//   previewDiv.style.height = "0";
//   previewDiv.style.zIndex = "9999999";
//   previewDiv.style.top = "0";
//   previewDiv.style.right = "0";
//   document.body.appendChild(previewDiv);

//   chrome.runtime.onMessage.addListener(listener);
// };
