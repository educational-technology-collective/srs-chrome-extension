const LoginButton = () => {
  const handleClick = () => {
    chrome.runtime.sendMessage({ message: "get_auth_token" });
    chrome.runtime.sendMessage({ message: "get_profile" });
  };

  return (
    <>
      <button onClick={handleClick}>Log In</button>
    </>
  );
};

export { LoginButton };
