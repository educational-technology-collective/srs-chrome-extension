import { API_ENDPOINT_LOG } from "./constants";

// makes POST request to the /test endpoint of the AWS Lambda instance.
export const makePostReqLog = async (payload: object) => {
  try {
    const resp = await fetch(API_ENDPOINT_LOG, {
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
