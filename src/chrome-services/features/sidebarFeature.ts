import { responseObject, handleErrorNullElement } from "../../types";

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
      console.log("width:", iframe.style.width.toString());
      if (iframe.style.width === "0vw") {
        // check if current margin is greater than 20vw.
        // if so, we set the margin to the greater value.
        // else, set it to 20vw.
        const viewportWidth = window.innerWidth;
        const currMarginArray = window.getComputedStyle(iplHeader).margin.split(" ");
        const currWidthMargin = currMarginArray[1].replace("px", "");

        if (parseInt(currWidthMargin, 10) > viewportWidth / 5) {
          pageHeader.style.marginRight = currWidthMargin + "px";
          iframe.style.width = currWidthMargin + "px";
        } else {
          pageHeader.style.marginRight = "40vw";
          iplHeader.style.marginRight = "40vw";
          iplContent.style.marginRight = "40vw";
          iframe.style.width = "40vw";
        }
      } else {
        pageHeader.style.marginRight = "";
        iplHeader.style.marginRight = "";
        iplContent.style.marginRight = "";
        iframe.style.width = "0vw";
      }
    }
    sendResponse({ message: "sidebar message received" });
    return true;
  };

  const iframe = document.createElement("iframe");

  iframe.style.position = "absolute";
  iframe.style.width = "0vw";
  iframe.style.height = "100vh";
  iframe.style.right = "0";
  iframe.style.margin = "0";
  iframe.src = chrome.runtime.getURL("index.html");
  document.body.appendChild(iframe);
  document.body.style.paddingRight = "40vw";

  // these will be undefined at the beginning.
  let pageHeader = <HTMLElement>document.getElementsByClassName("rc-PageHeader")[0];
  let iplHeader = <HTMLElement>document.getElementsByClassName("ItemPageLayout_header")[0];
  let iplContent = <HTMLElement>document.getElementsByClassName("ItemPageLayout_content")[0];

  console.log(pageHeader, iplHeader, iplContent);

  const renderDetector = new MutationObserver(() => {
    if (document.querySelector("#floating-ui-root")) {
      // this is the last element to load.
      const lastEl = document.getElementById("floating-ui-root");
      renderDetector.disconnect();

      if (lastEl) {
        // update elements after render.
        pageHeader = <HTMLElement>document.getElementsByClassName("rc-PageHeader")[0];
        iplHeader = <HTMLElement>document.getElementsByClassName("ItemPageLayout_header")[0];
        iplContent = <HTMLElement>document.getElementsByClassName("ItemPageLayout_content")[0];
      }
    } else {
      handleErrorNullElement("rc");
    }
  });

  renderDetector.observe(document.body, {
    childList: true,
    subtree: true,
  });

  chrome.runtime.onMessage.addListener(listener);
};
