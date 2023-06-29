import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  const handleClick = () => {
    loginWithPopup();
    // chrome.runtime.sendMessage({ message: "get_auth_token" });
    // chrome.runtime.sendMessage({ message: "get_profile" });
  };

  return (
    <>
      <button onClick={handleClick}>Log In</button>
    </>
  );
};

export { LoginButton };
