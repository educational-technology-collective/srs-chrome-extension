import { LoginButton } from ".";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <div id="landingPageContainer">
        <div id="appIconContainer">
          <img id="appIcon" src="/logo.png" alt="SRS Chrome Extension" />
        </div>
        <h1>Ambient Learning</h1>
        <p>Become a catalyst for knowledge.</p>
        <br></br>
        <div id="loginBtnContainer">
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export { LandingPage };
