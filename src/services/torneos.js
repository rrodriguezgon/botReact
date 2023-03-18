import axios from "axios";

const baseURL = "https://botapi-z8u7.onrender.com/torneos";
//const baseURL = "http://localhost:8080/torneos";

export const getAll = (params = {}) =>
  axios.get(baseURL, { params }).then((response) => {
    return response;
  });

export const getById = (id) =>
  axios.get(baseURL + `/${id}`).then((response) => {
    return response;
});

export const updateById = (id, torneo) =>
  axios.patch(baseURL + `/${id}`, torneo).then((response) => {
    return response;
});

export const deleteById = (id) =>
  axios.delete(baseURL + `/${id}`).then((response) => {
    return response;
  });

  export const deleteAll = () =>
  axios.delete(baseURL ).then((response) => {
    return response;
  });