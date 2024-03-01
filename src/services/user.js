import axios from "axios";

const baseURL = "http://217.182.129.103:4000/api/v1/user";
// const baseURL = "http://localhost:4000/api/v1/user";

export const login = (loginData = {}) =>
  axios.post(`${baseURL}/login`, loginData).then((response) => {
    return response;
  });

export const refresh = (loginData = {}) =>
  axios.post(`${baseURL}/refresh`, loginData).then((response) => {
    return response;
  });
