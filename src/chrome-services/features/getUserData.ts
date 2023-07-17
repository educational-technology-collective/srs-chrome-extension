import { setAccessToken, setUserEmail } from "../states";

const getUserData = () => {
  const emailFromLocalStorage = window.localStorage.getItem("userEmail");
  if (emailFromLocalStorage) {
    setUserEmail(emailFromLocalStorage);
  }

  // get user email from the service worker.
  chrome.runtime.onMessage.addListener((request: any) => {
    if (request.message === "user data from frontend") {
      setUserEmail(request.data.userEmail);
      setAccessToken(request.data.accessToken);
      window.localStorage.setItem("userEmail", request.data);
      window.localStorage.setItem("accessToken", request.data.accessToken);
      return true;
    }
  });

  console.log("getUserEmail", emailFromLocalStorage);
};

export { getUserData };
