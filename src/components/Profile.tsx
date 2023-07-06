import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        // get access token from Auth0 so that we can access protected API routes.
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://auth0-jwt-authorizer",
          },
        });
        chrome.storage.session.set({ accessToken: accessToken });
      } catch (e) {
        console.log(e);
      }
    };

    getAccessToken();
  }, [getAccessTokenSilently, user?.sub]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
    console.log("user:", user);
    console.log("user.name:", user.name);
    console.log("user.email:", user.email);
  }

  return (
    <>
      {isAuthenticated && user && (
        <div>
          {/* <img src={user.picture} alt={user.name} /> */}
          {/* <h2>{user.name}</h2> */}
          {/* <p>{user.email}</p> */}
          {/* <h3>User Metadata</h3> */}
          {/* {userMetadata ? <pre>{JSON.stringify(userMetadata, null, 2)}</pre> : "No user metadata defined"} */}
        </div>
      )}
    </>
  );
};

export { Profile };
