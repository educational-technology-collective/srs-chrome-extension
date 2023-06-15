import { API_GATEWAY } from "./constants";

// makes POST request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
export const makePostReq = async (endpoint: string, payload: object) => {
  try {
    const url = API_GATEWAY + endpoint;
    const resp = await fetch(url, {
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
