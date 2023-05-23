chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    (async () => {
      const response = await chrome.tabs.sendMessage(tabId, { message: changeInfo.url });
      console.log(response);
      return true;
    })();
  }
});
