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
    console.log("POST:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// makes GET request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
// params is an array of param-paramValue pair.
// for example, if my URL parameter is ?param1=pv1&param2=pv2,
// params = [["param1", "pv1"], ["param2", "pv2"]]
export const makeGetReq = async (endpoint: string, params: string[][]) => {
  try {
    let paramStr = "?";
    params.forEach((param) => {
      const p = `${param[0]}=${encodeURIComponent(param[1])}&`;
      paramStr += p;
    });
    paramStr = paramStr.substring(0, paramStr.length - 1);
    console.log(paramStr);
    const url = API_GATEWAY + endpoint + paramStr;
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await resp.json();
    console.log("GET:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
