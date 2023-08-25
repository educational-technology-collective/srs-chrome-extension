// import { useAuth0 } from "@auth0/auth0-react";

const DashboardButton = () => {
  // const { loginWithPopup } = useAuth0();

  const handleClick = () => {
    window.open(
      "chrome-extension://bakjlcbdgfgncaminbnhbfjlndmifdli/src/options/index.html"
    );
    //    loginWithPopup(
    //      {
    //        authorizationParams: {
    //          display: "popup",
    //          // redirect_uri:
    //          // "chrome-extension://bakjlcbdgfgncaminbnhbfjlndmifdli/src/options/index.html",
    //        },
    //      },
    //      { popup: myWindow }
    //    );
    //    // loginWithPopup();
  };

  return (
    <>
      <button onClick={handleClick}>Go to Dashboard</button>
    </>
  );
};

export { DashboardButton };
