import { API_ENDPOINT_CHUNK_TRANSCRIPT, API_ENDPOINT_TEST } from "./constants";

// makes POST request to the /test endpoint of the AWS Lambda instance.
export const makePostReqTest = async (payload: object) => {
  try {
    const resp = await fetch(API_ENDPOINT_TEST, {
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

// makes POST request to the /chunkTranscript endpoint of the AWS Lambda instance.
export const makePostReqChunkTranscript = async (payload: object[]) => {
  try {
    const resp = await fetch(API_ENDPOINT_CHUNK_TRANSCRIPT, {
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
