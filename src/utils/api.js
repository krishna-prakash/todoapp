import axios from "axios";

export function getApiCall(data) {
  return axios.get(data);
}
