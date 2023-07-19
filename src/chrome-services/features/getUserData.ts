import { setAccessToken, setUserEmail } from "../states";

const getUserData = () => {
  // const emailFromLocalStorage = window.localStorage.getItem("userEmail");
  // const accessTokenFromLocalStorage = window.localStorage.getItem("accessToken");
  // console.log("getUserData:", emailFromLocalStorage, accessTokenFromLocalStorage);
  // if (emailFromLocalStorage) {
  //   setUserEmail(emailFromLocalStorage);
  // }

  // get user email from the frontend.
  chrome.runtime.onMessage.addListener((request: any) => {
    if (request.message === "user data from frontend") {
      console.log("message received", request.data);
      window.localStorage.removeItem("userEmail");
      window.localStorage.removeItem("accessToken");
      setUserEmail(request.data.userEmail);
      setAccessToken(request.data.accessToken);
      window.localStorage.setItem("userEmail", request.data.userEmail);
      window.localStorage.setItem("accessToken", request.data.accessToken);

      return true;
    }
  });

  chrome.storage.session.get("this").then((data) => {
    console.log("data:", data);
  });
  // console.log("data:", data);
};

export { getUserData };
