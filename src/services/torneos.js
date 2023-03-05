import axios from "axios";

const baseURL = "http://localhost:8080/torneos";

export const getAll = (params = {}) =>
  axios.get(baseURL, { params }).then((response) => {
    return response;
  });

export const getById = (id) =>
  axios.get(baseURL + `/${id}`).then((response) => {
    return response;
});

export const deleteById = (id) =>
  axios.delete(baseURL + `/${id}`).then((response) => {
    return response;
  });
