import { LoginButton } from ".";
import "./styles/LoginPage.css";

const LoginPage = () => {
  return (
    <>
      <div id="loginPageContainer">
        <div id="appIconContainer">
          <img
            id="appIcon"
            src="../../ambient-learning-icon-plain.png"
            alt="SRS Chrome Extension"
          />
        </div>
        <h1>Ambient Learning</h1>
        <p>Your personalized learning companion.</p>
        <br></br>
        <div id="loginBtnContainer">
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export { LoginPage };
