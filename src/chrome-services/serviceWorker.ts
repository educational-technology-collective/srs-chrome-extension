chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    (async () => {
      const response = await chrome.tabs.sendMessage(tabId, { message: changeInfo.url });
      console.log(response);
      return true;
    })();
  }
});

chrome.action.onClicked.addListener((tab) => {
  console.log("activated");
  (async () => {
    if (tab.id) {
      console.log("activated");
      const response = await chrome.tabs.sendMessage(tab.id, "toggle");
      console.log(response);
      return true;
    }
  })();
});
