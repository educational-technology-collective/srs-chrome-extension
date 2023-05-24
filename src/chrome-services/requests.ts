import { API_ENDPOINT } from "./constants";

// generic POST request function.
// we use this to make POST request to the AWS Lambda instance.
export const makePostReq = async (payload: object) => {
  try {
    const resp = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
