import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL_API}/api/v1/user`;

export const login = (loginData = {}) =>
  axios.post(`${baseURL}/login`, loginData).then((response) => {
    return response;
  });

export const refresh = (loginData = {}) =>
  axios.post(`${baseURL}/refresh`, loginData).then((response) => {
    return response;
  });
