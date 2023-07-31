// chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
//   (async () => {
//     if (changeInfo.url) {
//       const response = await chrome.tabs.sendMessage(tabId, { message: "tab updated", data: changeInfo.url });
//       console.log(response);

//       return true;
//     }
//   })();
//   // chrome.tabs.query({ active: true, lastFocusedWindow: true }).then((tab) => {
//   //   console.log(tab);
//   // });
//   // (async () => {
//   //   const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//   //   console.log(tab);
//   // })();
// });

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  (async () => {
    if (changeInfo.status) {
      const url = (await chrome.tabs.get(tabId)).url;
      console.log(url);
      chrome.storage.local.set({ url: url });
      const res = await chrome.tabs.sendMessage(tabId, {
        message: "url from service worker",
        data: url,
      });
      console.log(res);
      // return true;
    }
  })();
});

// chrome.runtime.onMessage.addListener((request: any) => {
//   (async () => {
//     if (request.message === "user data from frontend") {
//       const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//       console.log(tab);
//       if (tab.id) {
//         await chrome.tabs.sendMessage(tab.id, {
//           message: "user data from service worker",
//           data: request.data,
//         });
//       }
//     }
//   })();
//   return true;
// });

// chrome.runtime.onMessage.addListener((request: any) => {
//   (async () => {
//     if (request.message === "numLms from content script") {
//       // chrome.storage.local.set({ lms: { url: url, numLms: numLms + 1 } });
//       await chrome.runtime.sendMessage({ message: "numLms from service worker" });
//     }
//   })();
//   return true;
// });

// send current page URL to the frontend.
// chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
//   (async () => {
//     if (changeInfo.status) {
//       const url = (await chrome.tabs.get(tabId)).url;
//       await chrome.runtime.sendMessage({ message: "url from service worker", data: url });
//     }
//   })();
//   return true;
// });

// user authentication.

// let isUserSignedIn = false;
// chrome.identity.onSignInChanged.addListener((accountId, isSignedIn) => {
//   (async () => {
//     if (isSignedIn) {
//       isUserSignedIn = true;
//       console.log("user signed in:", isUserSignedIn);
//       console.log("account id:", accountId);
//     } else {
//       isUserSignedIn = false;
//       console.log("user signed in:", isUserSignedIn);
//       console.log("account id:", accountId);
//     }
//   })();
//   return true;
// });

// chrome.runtime.onMessage.addListener((request) => {
//   (async () => {
//     console.log("request message:", request.message);
//     if (request.message === "get_auth_token") {
//       chrome.identity.getAuthToken({ interactive: true }, (token) => {
//         console.log("token:", token);
//         console.log("token.token:", token.token);
//         console.log("token.grantedScopes:", token.grantedScopes);
//         console.log("user signed in:", isUserSignedIn);
//       });
//     } else if (request.message === "get_profile") {
//       chrome.identity.getProfileUserInfo({ accountStatus: "ANY" }, (userInfo) => {
//         console.log("user info", userInfo);
//         console.log("user signed in:", isUserSignedIn);
//       });
//     } else if (request.message === "logout") {
//       chrome.identity.getAuthToken({ interactive: true }, (token) => {
//         console.log("token:", token);
//         if (token) {
//           chrome.identity.removeCachedAuthToken({ token: <string>token }, function () {
//             console.log("Access token revoked.");
//           });
//         }
//       });
//       // chrome.identity.clearAllCachedAuthTokens();
//       // chrome.identity.launchWebAuthFlow(
//       //   {
//       //     url: "https://accounts.google.com/logout",
//       //     // url: "https://accounts.google.com/logout?continue=https://www.example.com",
//       //     interactive: false,
//       //   },
//       //   (responseUrl) => {
//       //     // Perform any necessary clean-up or notify the user.
//       //     console.log("responseUrl", responseUrl);
//       //   }
//       // );
//       console.log("logged out");
//       console.log("user signed in:", isUserSignedIn);
//     }
//   })();
//   return true;
// });

// receiving LM pool from the frontend
// chrome.runtime.onMessage.addListener((request) => {
//   (async () => {
//     if (request.message === "GET from App") {
//       // convert VideoLm[] to Object for constant-time lookup
//       // key = endTime, val = LM object
//       const lmPoolMap = new Map();
//       request.data.forEach((lm: VideoLm) => {
//         lmPoolMap.set(lm.content.endTime, lm);
//       });

//       // pass to content script
//       const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
//       if (tab.id) {
//         // we can't send Map as data in the Chrome message passing API.
//         // it has to be JSON-serializable.
//         // so we convert it to an object before pushing message.
//         await chrome.tabs.sendMessage(tab.id, { message: "lmPoolMap", data: Object.fromEntries(lmPoolMap) });
//       }
//     }
//   })();
//   return true;
// });

// get LMs for the new URL
// chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
//   if (changeInfo.url) {
//     (async () => {
//       const res = await makeGetReqWithParam("/lms/search", [
//         ["videoUrl", "https://www.coursera.org/learn/python-data-analysis/lecture/Kgwr5/merging-dataframes"],
//       ]);

//       // convert VideoLm[] to Object for constant-time lookup
//       // key = endTime, val = LM object
//       const lmPoolMap = new Map();
//       res.forEach((lm: VideoLm) => {
//         lmPoolMap.set(lm.endTime, lm);
//       });

//       // we can't send Map as data in the Chrome message passing API.
//       // it has to be JSON-serializable.
//       // so we convert it to an object before pushing message.
//       await chrome.tabs.sendMessage(tabId, { message: "lmPoolMap", data: Object.fromEntries(lmPoolMap) });
//     })();
//   }
// });
