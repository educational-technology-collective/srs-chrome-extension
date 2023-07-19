import { useAuth0 } from "@auth0/auth0-react";
import { LandingPage, MainPage } from "./components";
import "./styles/App.css";
import { useState } from "react";
// import { makeGetReq } from "./utils";

const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  // const [url, setUrl] = useState("");
  const [numLms] = useState(0);

  if (isAuthenticated && user) {
    // interface tok {
    //   body: {
    //     access_token: string;
    //     refresh_token: string;
    //     scope: string;
    //     expires_in: number;
    //     token_type: string;
    //     audience: string;
    //     oauthTokenScope: string;
    //     client_id: string;
    //   };
    //   expiresAt: number;
    // }
    // interface auth0Err {
    //   error: string;
    //   error_description: string;
    // }
    // send user email and token to the content script.
    (async () => {
      try {
        // get access token from Auth0 so that we can access protected API routes.
        const accessToken = await getAccessTokenSilently();
        // const accessToken: tok = JSON.parse(
        //   window.localStorage.getItem(
        //     "@@auth0spajs@@::R4nxhWYh6Sl8ZiBtl3nIJSI8l16pbIOM::default::openid profile email offline_access"
        //   ) as string
        // );

        console.log("email:", user.email);
        console.log("token:", accessToken);

        // const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const [tab] = await chrome.tabs.query({ url: "https://www.coursera.org/learn/*/lecture/*" });
        console.log("app.tsx", tab);
        // send user data to service worker.
        if (tab.id) {
          await chrome.tabs.sendMessage(tab.id, {
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

  // chrome.runtime.onMessage.addListener((request: any) => {
  //   (async () => {
  //     if (request.message === "numLms from service worker") {
  //       setNumLms(numLms + 1);
  //       // chrome.storage.local.set({ lms: { url: url, numLms: numLms + 1 } });
  //     }
  //   })();
  //   return true;
  // });

  return (
    <>
      {!isAuthenticated && <LandingPage />}
      {isAuthenticated && <MainPage user={user} numLms={numLms} />}
    </>
  );
};

export default App;
