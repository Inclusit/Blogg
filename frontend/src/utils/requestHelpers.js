//Path: frontend/src/utils/requestHelpers.js

import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_URL;

function getAccessToken() {
  const token = JSON.parse(localStorage.getItem("AccessToken"));
  return token && token !== "undefined" ? token.access : "";
}

export async function GET_REQUEST(URL) {
  try {
    const response = await axios.get(`${BaseUrl}${URL}`);

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}

export async function POST_REQUEST(
  URL,
  data,
  contentType = "application/json"
) {
  const accessToken = getAccessToken();
  let headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (contentType === "application/json") {
    headers["Content-Type"] = "application/json";
  } else if (contentType === "multipart/form-data") {
    headers["Content-Type"] = "multipart/form-data";
  }

  try {
    const response = await axios.post(`${BaseUrl}${URL}`, data, {
      headers: headers,
    });

    if (response.status === 200) {
      return response;
    } else if (response.status === 201) {
      return { response: response, ok: "Created" };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}

export async function PUT_REQUEST(URL, data) {
  const accessToken = getAccessToken();

  try {
    const response = await axios.put(`${BaseUrl}${URL}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { response: response, ok: "Updated" };
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}

export async function DELETE_REQUEST(URL) {
  const accessToken = getAccessToken();

  try {
    const response = await axios.delete(`${BaseUrl}${URL}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 204) {
      return { response: response, ok: "Deleted" };
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
}

export async function UPLOAD_FILE(URL, data) {
  const accessToken = getAccessToken();

  try {
    const response = await axios.post(`${BaseUrl}${URL}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return response;
    } else {
      return null;
    } 
  }
  catch (err) {
    throw err;
  }
}