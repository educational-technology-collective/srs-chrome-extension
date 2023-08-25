import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  const handleClick = () => {
    loginWithPopup();
  };

  return (
    <>
      <button onClick={handleClick}>Log In</button>
    </>
  );
};

export { LoginButton };
