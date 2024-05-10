//Path: backend/api/helpers/request.helper.js

import axios from "axios";
const BaseUrl = "http://localhost:3000";

export async function GET_REQUEST(URL) {
  return await axios.get(BaseUrl + URL);
}

export async function POST_REQUEST(URL, data) {
  return await axios.post(BaseUrl + URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
