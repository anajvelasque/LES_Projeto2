import { v4 as uuid } from "uuid";
import { axiosClient } from "../utils/axiosClient";

export let patients = async function () {
  try {
    const result = await axiosClient.get("/patients/");
    return result;
  } catch (error) {
    console.error(error);
  }
};
