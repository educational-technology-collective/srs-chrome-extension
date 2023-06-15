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

let isUserSignedIn = false;
chrome.identity.onSignInChanged.addListener((accountId, isSignedIn) => {
  (async () => {
    if (isSignedIn) {
      isUserSignedIn = true;
      console.log("user signed in:", isUserSignedIn);
      console.log("account id:", accountId);
    } else {
      isUserSignedIn = false;
      console.log("user signed in:", isUserSignedIn);
      console.log("account id:", accountId);
    }
  })();
  return true;
});

chrome.runtime.onMessage.addListener((request) => {
  (async () => {
    console.log("request message:", request.message);
    if (request.message === "get_auth_token") {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        console.log("token:", token);
        console.log("token.token:", token.token);
        console.log("token.grantedScopes:", token.grantedScopes);
        console.log("user signed in:", isUserSignedIn);
      });
    } else if (request.message === "get_profile") {
      chrome.identity.getProfileUserInfo({ accountStatus: "ANY" }, (userInfo) => {
        console.log("user info", userInfo);
        console.log("user signed in:", isUserSignedIn);
      });
    } else if (request.message === "logout") {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        console.log("token:", token);
        if (token) {
          chrome.identity.removeCachedAuthToken({ token: <string>token }, function () {
            console.log("Access token revoked.");
          });
        }
      });
      // chrome.identity.clearAllCachedAuthTokens();
      // chrome.identity.launchWebAuthFlow(
      //   {
      //     url: "https://accounts.google.com/logout",
      //     // url: "https://accounts.google.com/logout?continue=https://www.example.com",
      //     interactive: false,
      //   },
      //   (responseUrl) => {
      //     // Perform any necessary clean-up or notify the user.
      //     console.log("responseUrl", responseUrl);
      //   }
      // );
      console.log("logged out");
      console.log("user signed in:", isUserSignedIn);
    }
  })();
  return true;
});
