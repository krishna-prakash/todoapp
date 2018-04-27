import axios from "axios";

export function postApiCall(data) {
  axios
    .post(data[0], data[1][0])
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

export function getApiCall(data) {
  return axios.get(data);
}
