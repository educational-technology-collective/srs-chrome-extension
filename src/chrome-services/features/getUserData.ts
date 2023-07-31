import { makePostReq } from "../../utils";

// Get user data from the React frontend.
const getUserData = () => {
  chrome.runtime.onMessage.addListener((request: any) => {
    if (request.message === "user data from frontend") {
      console.log("message received", request.data);

      // Clear localstorage.
      window.localStorage.removeItem("userEmail");
      window.localStorage.removeItem("accessToken");

      // Save updated user data to localstorage.
      window.localStorage.setItem("userEmail", request.data.userEmail);
      window.localStorage.setItem("accessToken", request.data.accessToken);

      // Add user to database.
      makePostReq(`/users/${request.data.userEmail}`, {});
    }

    return undefined;
  });
};

export { getUserData };
