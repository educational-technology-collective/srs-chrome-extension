import { User } from "@auth0/auth0-react";

// import { LogoutButton } from ".";
import "./styles/MainPage.css";

interface Props {
  user: User | undefined;
}

const MainPage = ({ user }: Props) => {
  //  const [numLms, setNumLms] = useState(0);
  //
  //  // Get the number of LMs for this video stored in chrome.storage.local.
  //  chrome.storage.local
  //    .get(["url"])
  //    .then((urlKeyVal) => {
  //      const url: string = urlKeyVal["url"];
  //      chrome.storage.local.get([url]).then((collectedLmsKeyVal) => {
  //        if (Object.keys(collectedLmsKeyVal).length > 0) {
  //          setNumLms(collectedLmsKeyVal[url].length);
  //        }
  //      });
  //    })
  //    .catch((e) => {
  //      console.log(e);
  //    });

  return (
    <>
      <div id="mainPageContainer">
        <div id="topBar">
          <p>Hi, {user?.name}!</p>
        </div>
        <p>You are now logged in. You may now close this tab.</p>
        <p>
          To log out, click on the extension icon and click on the Log Out
          button.
        </p>
        {/*
        <div id="logoutBtnContainer">
          <LogoutButton />
        </div>
        */}
      </div>
    </>
  );
};

export { MainPage };
