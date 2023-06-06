import { responseObject } from "../../types";

export const sideBar = () => {
  console.log("side-panel script loaded");

  const listener = (
    message: string,
    sender: chrome.runtime.MessageSender,
    sendResponse: (resposne: responseObject) => void
  ) => {
    if (message == "toggle") {
      console.log("message received");
      console.log(sender.tab ? "from a content script:" + sender.tab.url : "from an extension");

      if (iframe.style.width == "0px") {
        iframe.style.width = "500px";
      } else {
        iframe.style.width = "0px";
      }
    }
    sendResponse({ message: "sidebar message received" });
    return true;
  };

  const iframe = document.createElement("iframe");
  iframe.style.background = "green";
  iframe.style.height = "100%";
  iframe.style.width = "0px";
  iframe.style.position = "fixed";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.zIndex = "99999";
  iframe.style.border = "0px";
  iframe.src = chrome.runtime.getURL("index.html");

  document.body.appendChild(iframe);

  chrome.runtime.onMessage.addListener(listener);
};
