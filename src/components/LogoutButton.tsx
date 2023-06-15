const LogoutButton = () => {
  const handleClick = () => {
    chrome.runtime.sendMessage({ message: "logout" });
  };

  return <button onClick={handleClick}>Log Out</button>;
};

export { LogoutButton };
