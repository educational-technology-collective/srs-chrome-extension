import { User } from "@auth0/auth0-react";
import { LogoutButton } from ".";
import "../styles/MainPage.css";

interface Props {
  user: User | undefined;
  numLms: number;
}

const MainPage = ({ user, numLms }: Props) => {
  return (
    <>
      <div id="mainPageContainer">
        <div id="topBar">
          <p>Hi, {user?.name}!</p>
        </div>
        <div id="lms">
          <p>
            Did you know that you've experienced <span style={{ fontWeight: "bold" }}>{numLms}</span> learning moments
            from this video?
          </p>
        </div>
        <div id="fcs">
          <p>I automatically created the relevant flashcards for you.</p>
          <p>You can open the Ambient Learning app on your phone to review them!</p>
        </div>
        <div id="logoutBtnContainer">
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export { MainPage };
