import { useAuth0 } from "@auth0/auth0-react";
import { makePostReq } from "./utils";

import { LandingPage, MainPage } from "./components";
import "./styles/App.css";

const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  if (isAuthenticated && user) {
    console.log("user is authenticated!!!!");
    // Send user email and token to the content script.
    (async () => {
      try {
        // Get access token from Auth0 so that we can access protected API routes.
        const accessToken = await getAccessTokenSilently();

        // Add user to database.
        // Clear localstorage.
        window.localStorage.removeItem("userEmail");
        window.localStorage.removeItem("accessToken");

        // Save updated user data to localstorage.
        window.localStorage.setItem("userEmail", user.email as string);
        window.localStorage.setItem("accessToken", accessToken);
        console.log(window.localStorage.getItem("accessToken"));

        makePostReq(`/${user.email}`, {});

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

  // Reset icon.
  (async () => {
    await chrome.action.setIcon({
      path: "ambient-learning-icon-plain-128px.png",
    });
  })();

  return (
    <>
      {!isAuthenticated && <LandingPage />}
      {isAuthenticated && <MainPage user={user} />}
    </>
  );
};

export default App;
