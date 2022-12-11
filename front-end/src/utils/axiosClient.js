import axios from "axios";

const TOKEN_ID = "ff0f2b78-685a-11ed-9022-0242ac120002";

export const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:5001/tp-es1-clica-medica/us-central1",
  headers: {
    Authorization: `Basic ${TOKEN_ID}`,
    "Content-Type": "application/json",
    withCredentials: true,
  },
  credentials: "include",
  mode: "cors",
});
