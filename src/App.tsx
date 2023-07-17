import { useAuth0 } from "@auth0/auth0-react";
import { LandingPage, MainPage } from "./components";
import "./styles/App.css";
import { useState } from "react";
// import { makeGetReq } from "./utils";

const App = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  // const [url, setUrl] = useState("");
  const [numLms, setNumLms] = useState(0);

  if (isAuthenticated && user) {
    // send user email and token to the content script.
    (async () => {
      try {
        // get access token from Auth0 so that we can access protected API routes.
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://auth0-jwt-authorizer",
          },
        });

        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        if (tab.id) {
          const res = await chrome.tabs.sendMessage(tab.id, {
            message: "user data from frontend",
            data: { userEmail: user.email, accessToken: accessToken },
          });
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }

  // useEffect(() => {
  //   chrome.storage.local.get(["lms"]).then((obj) => {
  //     if (obj.lms && obj.lms.url === url) {
  //       setUrl(obj.lms.numLms);
  //     }
  //   });
  // }, [url]);

  // chrome.runtime.onMessage.addListener((request: any) => {
  //   (async () => {
  //     console.log("request", request);
  //     if (request.message === "url from service worker") {
  //       setUrl(request.data);
  //     }
  //   })();
  //   return true;
  // });

  chrome.runtime.onMessage.addListener((request: any) => {
    (async () => {
      if (request.message === "numLms from service worker") {
        setNumLms(numLms + 1);
        // chrome.storage.local.set({ lms: { url: url, numLms: numLms + 1 } });
      }
    })();
    return true;
  });

  return (
    <>
      {!isAuthenticated && <LandingPage />}
      {isAuthenticated && <MainPage user={user} numLms={numLms} />}
    </>
  );
};

export default App;
