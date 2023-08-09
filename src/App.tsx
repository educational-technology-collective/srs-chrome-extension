import { useAuth0 } from "@auth0/auth0-react";

import { LandingPage, MainPage } from "./components";
import "./styles/App.css";

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
