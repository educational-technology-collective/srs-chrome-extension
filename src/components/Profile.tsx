import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  fetch("https://dev-cra0zttj8xlwi6sh.us.auth0.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: "kZlm2RJ9t9HcP06wNgXi8t8G7Ksu38oo",
      client_secret: "LMebFEF-rSR0TU48vBipxqgKo3n4grjtKAUWjP0o2LGowaqLTj0lPLVco69tNLeH",
      audience: "https://auth0-jwt-authorizer",
      grant_type: "client_credentials",
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.access_token);
      chrome.storage.session.set({ accessToken: data.access_token });
    });
  //   const [userMetadata, setUserMetadata] = useState(null);

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     //   const domain = "dev-cra0zttj8xlwi6sh.us.auth0.com";

  //     try {
  //       const accessToken = await getAccessTokenWithPopup({
  //         authorizationParams: {
  //           body: {
  //             client_id: "8bc0qUmibSf3yVXzq0ovLQaDLoSGqZTW",
  //             client_secret: "THX1gJUSyTEksyP8k28Vcqco5TYiaIvjoKFNTULT0KdzI1XXrspFDz9mM6LGEBzy",
  //             audience: "https://auth0-jwt-authorizer",
  //             grant_type: "client_credentials",
  //           },
  //         },
  //       });
  //       console.log("accessToken:", accessToken);

  //       // if (user) {
  //       //   const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

  //       //   const metadataResponse = await fetch(userDetailsByIdUrl, {
  //       //     headers: {
  //       //       Authorization: `Bearer ${accessToken}`,
  //       //     },
  //       //   });

  //       //   const { user_metadata } = await metadataResponse.json();

  //       //   setUserMetadata(user_metadata);
  //       // }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   getUserMetadata();
  // }, [getAccessTokenWithPopup, user?.sub]);

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
