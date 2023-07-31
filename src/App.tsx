import { useAuth0 } from "@auth0/auth0-react";

import { LandingPage, MainPage } from "./components";
import "./styles/App.css";
import { responseObject } from "./types";

const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated && user) {
    // Send user email and token to the content script.
    (async () => {
      try {
        // Get access token from Auth0 so that we can access protected API routes.
        const accessToken = await getAccessTokenSilently();

        const [tab] = await chrome.tabs.query({
          url: "https://www.coursera.org/learn/*/lecture/*",
        });

        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            message: "user data from frontend",
            data: { userEmail: user.email, accessToken: accessToken },
          });
        }
      } catch (e) {
        console.log("error", e);
        // if ((e as auth0Err).error === "missing_refresh_token" || (e as auth0Err).error === "invalid_grant") {
        //   loginWithPopup();
        // }
      }
    })();
  }

  chrome.runtime.onMessage.addListener(
    (
      request: any,
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response: responseObject) => void
    ) => {
      (async () => {
        if (request.message === "lm triggered from content script") {
          const videoUrl = request.data.videoUrl;
          const lm_id = request.data.lm_id;

          const collectedLms = await chrome.storage.local.get([videoUrl]);
          console.log(collectedLms);

          if (Object.keys(collectedLms).length === 0) {
            console.log(1);
            await chrome.storage.local.set({
              [videoUrl]: [lm_id] as string[],
            });
          } else if (!collectedLms[videoUrl].includes(lm_id)) {
            console.log(2);
            collectedLms[videoUrl].push(lm_id);
            await chrome.storage.local.set({
              [videoUrl]: collectedLms[videoUrl],
            });
          }
        }

        sendResponse({ message: "lm received" });
      })();
      return true;
    }
  );

  return (
    <>
      {!isAuthenticated && <LandingPage />}
      {isAuthenticated && <MainPage user={user} />}
    </>
  );
};

export default App;
