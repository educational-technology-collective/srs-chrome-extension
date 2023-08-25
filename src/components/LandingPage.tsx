import { DashboardButton } from ".";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <>
      <div id="landingPageContainer">
        <div id="appIconContainer">
          <img
            id="appIcon"
            src="ambient-learning-icon-plain.png"
            alt="SRS Chrome Extension"
          />
        </div>
        <h1>Ambient Learning</h1>
        <p>Your personalized learning companion.</p>
        <br></br>
        <div id="dashboardBtnContainer">
          <DashboardButton />
        </div>
      </div>
    </>
  );
};

export { LandingPage };
