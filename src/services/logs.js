import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL_API}/api/v1/logs`;

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem("token")}`}

export const getAll = () =>
  axios.get(baseURL).then((response) => {
    return response;
  });

export const getAllWithFilters = (filters = {}) =>
  axios.post(`${baseURL}/filters`, filters).then((response) => {
    return response;
  });
