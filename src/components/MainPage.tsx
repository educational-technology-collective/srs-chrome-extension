import { User } from "@auth0/auth0-react";
import { LogoutButton } from ".";
import "../styles/MainPage.css";
import { useState } from "react";

interface Props {
  user: User | undefined;
}

const MainPage = ({ user }: Props) => {
  const [numLms, setNumLms] = useState(0);

  // Get the number of LMs for this video stored in chrome.storage.local.
  chrome.storage.local
    .get(["url"])
    .then((urlKeyVal) => {
      const url: string = urlKeyVal["url"];
      chrome.storage.local.get([url]).then((collectedLmsKeyVal) => {
        if (Object.keys(collectedLmsKeyVal).length > 0) {
          setNumLms(collectedLmsKeyVal[url].length);
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });

  return (
    <>
      <div id="mainPageContainer">
        <div id="topBar">
          <p>Hi, {user?.name}!</p>
        </div>
        <div id="lms">
          <p>
            Did you know that you've experienced{" "}
            <span style={{ fontWeight: "bold" }}>{numLms}</span> learning
            moments from this video?
          </p>
        </div>
        <div id="fcs">
          <p>I automatically created the relevant flashcards for you.</p>
          <p>
            You can open the Ambient Learning app on your phone to review them!
          </p>
        </div>
        <div id="logoutBtnContainer">
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export { MainPage };
