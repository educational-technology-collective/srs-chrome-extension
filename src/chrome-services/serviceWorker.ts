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

let user_signed_in = false;
chrome.identity.onSignInChanged.addListener(function (account_id, signedIn) {
  if (signedIn) {
    user_signed_in = true;
    console.log("user signed in:", user_signed_in);
    console.log("account id:", account_id);
  } else {
    user_signed_in = false;
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "get_auth_token") {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      console.log("token:", token);
    });
  } else if (request.message === "get_profile") {
    chrome.identity.getProfileUserInfo({ accountStatus: "ANY" }, function (user_info) {
      console.log("user info", user_info);
    });
  }

  return true;
});
