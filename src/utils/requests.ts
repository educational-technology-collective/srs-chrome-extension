import { API_GATEWAY_DEV } from "./constants";

// makes a POST request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
export const makePostReq = async (endpoint: string, payload: object) => {
  try {
    const url = API_GATEWAY_DEV + endpoint;
    const token = window.localStorage.getItem("accessToken");
    console.log("token from pr:", token);
    const resp = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
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

// makes a GET request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
export const makeGetReq = async (endpoint: string) => {
  try {
    const url = API_GATEWAY_DEV + endpoint;
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

// makes a GET request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
// params is an array of param-paramValue pair.
// for example, if my URL parameter is ?param1=pv1&param2=pv2,
// params = [["param1", "pv1"], ["param2", "pv2"]]
export const makeGetReqWithParam = async (
  endpoint: string,
  params: string[][]
) => {
  try {
    let paramStr = "?";
    params.forEach((param) => {
      const p = `${param[0]}=${encodeURIComponent(param[1])}&`;
      paramStr += p;
    });
    paramStr = paramStr.substring(0, paramStr.length - 1);
    console.log(paramStr);
    const url = API_GATEWAY_DEV + endpoint + paramStr;
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

// makes a PUT request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
export const makePutReq = async (endpoint: string, payload: object) => {
  try {
    const url = API_GATEWAY_DEV + endpoint;
    const token = window.localStorage.getItem("accessToken");
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await resp.json();
    console.log("PUT:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// makes a DELETE request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
export const makeDeleteReq = async (endpoint: string) => {
  try {
    const url = API_GATEWAY_DEV + endpoint;
    const token = window.localStorage.getItem("accessToken");
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await resp.json();
    console.log("DELETE:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// makes a DELETE request to the given endpoint of the AWS Lambda instance.
// endpoint should lead with a slash.
// params is an array of param-paramValue pair.
// for example, if my URL parameter is ?param1=pv1&param2=pv2,
// params = [["param1", "pv1"], ["param2", "pv2"]]
export const makeDeleteReqWithParam = async (
  endpoint: string,
  params: string[][]
) => {
  try {
    let paramStr = "?";
    params.forEach((param) => {
      const p = `${param[0]}=${encodeURIComponent(param[1])}&`;
      paramStr += p;
    });
    paramStr = paramStr.substring(0, paramStr.length - 1);
    console.log(paramStr);
    const url = API_GATEWAY_DEV + endpoint + paramStr;
    const token = window.localStorage.getItem("accessToken");
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await resp.json();
    console.log("DELETE:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
