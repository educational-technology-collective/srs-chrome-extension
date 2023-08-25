import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import {
  AUTH0_AUDIENCE,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
} from "./utils/constants.ts";

import App from "./App.tsx";
import "./styles/index.css";

console.log(window.location.origin);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Auth0Provider
    domain={AUTH0_DOMAIN}
    clientId={AUTH0_CLIENT_ID}
    authorizationParams={{
      // redirect_uri: window.location.origin,
      redirect_uri:
        "chrome-extension://bakjlcbdgfgncaminbnhbfjlndmifdli/src/options/index.html",
      audience: AUTH0_AUDIENCE,
    }}
    useRefreshTokens={true}
    // useRefreshTokensFallback={true}
    cacheLocation="localstorage"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
